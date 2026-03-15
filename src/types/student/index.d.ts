export interface StudentModel   {
    id: number
    username: string
    realName: string
    role: string
    avatar: string
    createTime: string
    updateTime: string
    className: string
  }
/**
 * 分页查询学生参数
 */
  export interface StudentQueryDTO {
    page?: number
    limit?: number
    teacherId?: number
    classId?: number
    realName?: string
  }