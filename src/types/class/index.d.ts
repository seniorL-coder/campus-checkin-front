export interface ClassModel {
    id: number
    className: string
    teacherId: number
    teacherName: string
    major: string
    createTime: string
    updateTime: string
  }

  /**
   * 更新班级所需的数据类型
   */
  export interface UpdateClassesType {
    id: string | number
    className: string
    major: string
  }
/**
 * 添加班级所需字段
 */
  export interface CreateClassesType {
    className: string
    major: string
  }