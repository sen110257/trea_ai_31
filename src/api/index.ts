import type { SolarTerm } from '@/data/solarTerms'
import { solarTerms, searchSolarTerms, getSolarTermById, getSolarTermsBySeason } from '@/data/solarTerms'
import type { Story } from '@/data/stories'
import { initialStories } from '@/data/stories'

const API_BASE_URL = 'https://api.example.com/v1'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface PaginationParams {
  page: number
  pageSize: number
}

interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const mockResponse = async <T>(data: T, delayMs: number = 300): Promise<ApiResponse<T>> => {
  await delay(delayMs)
  return {
    code: 200,
    message: 'success',
    data
  }
}

export const solarTermApi = {
  getList: async (params: PaginationParams): Promise<ApiResponse<PaginationResponse<SolarTerm>>> => {
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const list = solarTerms.slice(start, end)
    
    return mockResponse({
      list,
      total: solarTerms.length,
      page: params.page,
      pageSize: params.pageSize
    })
  },

  search: async (keyword: string): Promise<ApiResponse<SolarTerm[]>> => {
    const results = searchSolarTerms(keyword)
    return mockResponse(results)
  },

  getById: async (id: string): Promise<ApiResponse<SolarTerm | undefined>> => {
    const result = getSolarTermById(id)
    return mockResponse(result)
  },

  getBySeason: async (season: string): Promise<ApiResponse<SolarTerm[]>> => {
    const results = getSolarTermsBySeason(season)
    return mockResponse(results)
  },

  getToday: async (): Promise<ApiResponse<SolarTerm>> => {
    const today = new Date()
    const month = today.getMonth() + 1
    const day = today.getDate()
    
    let targetIndex = 0
    if (month === 2 && day >= 3 || month > 2) {
      if (month === 2) targetIndex = 0
      else if (month === 3) targetIndex = day < 5 ? 1 : 2
      else if (month === 4) targetIndex = day < 4 ? 3 : 4
      else if (month === 5) targetIndex = day < 5 ? 5 : 6
      else if (month === 6) targetIndex = day < 5 ? 7 : 8
      else if (month === 7) targetIndex = day < 6 ? 9 : 10
      else if (month === 8) targetIndex = day < 7 ? 11 : 12
      else if (month === 9) targetIndex = day < 7 ? 13 : 14
      else if (month === 10) targetIndex = day < 8 ? 15 : 16
      else if (month === 11) targetIndex = day < 7 ? 17 : 18
      else if (month === 12) targetIndex = day < 7 ? 19 : 20
    } else {
      if (month === 1) targetIndex = day < 5 ? 22 : 23
      else targetIndex = 21
    }
    
    return mockResponse(solarTerms[targetIndex])
  },

  getBySeasonGrouped: async (): Promise<ApiResponse<Record<string, SolarTerm[]>>> => {
    const grouped: Record<string, SolarTerm[]> = {
      spring: [],
      summer: [],
      autumn: [],
      winter: []
    }
    
    solarTerms.forEach(st => {
      grouped[st.season].push(st)
    })
    
    return mockResponse(grouped)
  }
}

let stories = [...initialStories]

export const storyApi = {
  getBySolarTermId: async (solarTermId: string, params: PaginationParams): Promise<ApiResponse<PaginationResponse<Story>>> => {
    const filtered = stories.filter(s => s.solarTermId === solarTermId)
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const list = filtered.slice(start, end)
    
    return mockResponse({
      list,
      total: filtered.length,
      page: params.page,
      pageSize: params.pageSize
    })
  },

  getByUserId: async (userId: string, params: PaginationParams): Promise<ApiResponse<PaginationResponse<Story>>> => {
    const filtered = stories.filter(s => s.author.id === userId)
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const list = filtered.slice(start, end)
    
    return mockResponse({
      list,
      total: filtered.length,
      page: params.page,
      pageSize: params.pageSize
    })
  },

  create: async (story: Omit<Story, 'id' | 'createdAt' | 'likes' | 'isLiked'>): Promise<ApiResponse<Story>> => {
    const newStory: Story = {
      ...story,
      id: Date.now().toString(),
      createdAt: Date.now(),
      likes: 0,
      isLiked: false
    }
    stories.unshift(newStory)
    return mockResponse(newStory)
  },

  delete: async (storyId: string): Promise<ApiResponse<boolean>> => {
    const index = stories.findIndex(s => s.id === storyId)
    if (index > -1) {
      stories.splice(index, 1)
      return mockResponse(true)
    }
    return mockResponse(false)
  },

  toggleLike: async (storyId: string): Promise<ApiResponse<boolean>> => {
    const story = stories.find(s => s.id === storyId)
    if (story) {
      story.isLiked = !story.isLiked
      story.likes += story.isLiked ? 1 : -1
      return mockResponse(story.isLiked)
    }
    return mockResponse(false)
  }
}

export const userApi = {
  login: async (username: string, password: string): Promise<ApiResponse<{ user: { id: string; nickname: string; avatar: string }; token: string }>> => {
    await delay(500)
    return mockResponse({
      user: {
        id: Date.now().toString(),
        nickname: username || '节气爱好者',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20person%20with%20chinese%20style%20hat%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
      },
      token: 'mock_token_' + Date.now()
    })
  },

  loginWithCode: async (phone: string, code: string): Promise<ApiResponse<{ user: { id: string; nickname: string; avatar: string }; token: string }>> => {
    await delay(500)
    return mockResponse({
      user: {
        id: Date.now().toString(),
        nickname: '用户' + phone.slice(-4),
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20person%20with%20chinese%20style%20hat%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
      },
      token: 'mock_token_' + Date.now()
    })
  },

  sendCode: async (phone: string): Promise<ApiResponse<boolean>> => {
    await delay(500)
    return mockResponse(true)
  }
}
