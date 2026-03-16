export interface StudentModel {
  id: number
  username: string
  realName: string
  role: string
  avatar: string
  createTime: string
  updateTime: string
  className: string
  classId: number
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

/**
 * 添加学生
 */
export interface AddStudentModel {
  classId: number | string
  username: string
  realName: string
  avatar?: string // 可选，如果为空可以使用默认头像
}
