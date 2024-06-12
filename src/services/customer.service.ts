import { adminInstance } from '../config/axiosConfig.ts'
interface DataGetCustomer {
  status?: string
  page: number
  size: number
  fromDate?: Date
  startDate?: Date
  name?: string
}
interface DataCustomer {
  status: string
  page: number
  size: number
  fromDate?: Date
  startDate?: Date
  name?: string
}
interface DataUpdateCustomer {
  id: string
  body: DataCustomer
}
export const getCustomer = async ({ status, fromDate, startDate, page, size, name }: DataGetCustomer) => {
  try {
    const response = await adminInstance.get(`manager/company?status=${status}&page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const banCustomer = async (id: string) => {
  try {
    const response = await adminInstance.delete(`manager/company/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const approveCustomer = async (id: string) => {
  try {
    const response = await adminInstance.put(`manager/company/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const extendService = async (data: any) => {
  try {
    const response = await adminInstance.put(`manager/queueExtend/`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updateCustomer = async ({ id, body }: DataUpdateCustomer) => {
  try {
    const response = await adminInstance.put(`manager/company/${id}`, body)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const uploadFiles = async (id: string, files: any) => {
  try {
    const formData = new FormData()
    files.forEach((file: any) => {
      formData.append('files', file)
    })
    formData.append('id', id)
    const response = await adminInstance.put(`manager/company/uploadContract`, formData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
