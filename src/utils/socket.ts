// 定义通用的消息 JSON 结构
interface SocketMsg<T = any> {
  type: string // 对应后端的业务类型，如 "NEW_ACTIVITY"
  data: T // 具体的业务数据
}

class NativeSocketService {
  private ws: WebSocket | null = null
  private readonly url: string = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws/admin'
  private messageListeners: Map<string, Array<(data: any) => void>> = new Map()
  private reconnectCount = 0
  private maxReconnectAttempts = 5

  /**
   * 建立连接
   * @param token 传入你的 JWT Token
   */
  public connect(token: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) return

    // 适配你后端 getToken 的逻辑：从 query 传参
    const fullUrl = `${this.url}?token=${token}`
    this.ws = new WebSocket(fullUrl)

    this.ws.onopen = () => {
      console.log('%c🚀 WebSocket 已连接', 'color: #42b983')
      this.reconnectCount = 0
    }

    this.ws.onmessage = (event) => {
      try {
        const msg: SocketMsg = JSON.parse(event.data)
        this.dispatchEvent(msg)
      } catch (e) {
        console.warn('收到非 JSON 消息:', event.data)
      }
    }

    this.ws.onclose = (e) => {
      console.warn(`🔌 bu连接关闭: ${e.code} ${e.reason}`)
      this.attemptReconnect(token)
    }

    this.ws.onerror = (err) => {
      console.error('❌ WebSocket 错误:', err)
    }
  }

  /**
   * 模拟 Socket.io 的事件监听
   */
  public on<T>(type: string, callback: (data: T) => void): void {
    if (!this.messageListeners.has(type)) {
      this.messageListeners.set(type, [])
    }
    this.messageListeners.get(type)?.push(callback)
  }

  /**
   * 模拟 Socket.io 的发送事件
   */
  public emit<T>(type: string, data: T): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const payload: SocketMsg<T> = { type, data }
      this.ws.send(JSON.stringify(payload))
    } else {
      ElMessage.error('连接已断开，请重试')
    }
  }

  /**
   * 消息分发核心逻辑
   */
  private dispatchEvent(msg: SocketMsg): void {
    const callbacks = this.messageListeners.get(msg.type)
    if (callbacks) {
      callbacks.forEach((cb) => cb(msg.data))
    }
  }

  /**
   * 自动重连逻辑
   */
  private attemptReconnect(token: string): void {
    if (this.reconnectCount < this.maxReconnectAttempts) {
      this.reconnectCount++
      console.log(`正在尝试第 ${this.reconnectCount} 次重连...`)
      setTimeout(() => this.connect(token), 3000)
    }
  }

  public off(type: string): void {
    this.messageListeners.delete(type)
  }

  public close(): void {
    this.ws?.close()
    this.ws = null
  }
}

export default new NativeSocketService()
