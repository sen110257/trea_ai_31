export interface Story {
  id: string
  title: string
  content: string
  image: string | null
  solarTermId: string
  solarTermName: string
  author: {
    id: string
    nickname: string
    avatar: string
  }
  createdAt: number
  likes: number
  isLiked: boolean
}

export const initialStories: Story[] = [
  {
    id: 'story1',
    title: '奶奶的立春故事',
    content: '小时候每到立春，奶奶总会给我们做春饼。那薄薄的春饼，卷上豆芽、韭黄、鸡蛋丝，咬一口，满嘴都是春天的味道。奶奶说，立春咬春，就能咬得住春天的尾巴，一年都会有好运气。如今奶奶年纪大了，做不动春饼了，但那份春天的味道，永远留在我的记忆里。',
    image: null,
    solarTermId: 'lichun',
    solarTermName: '立春',
    author: {
      id: 'user1',
      nickname: '春风拂面',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20woman%20with%20flowers%20in%20hair%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
    },
    createdAt: Date.now() - 86400000 * 3,
    likes: 28,
    isLiked: false
  },
  {
    id: 'story2',
    title: '清明时节雨纷纷',
    content: '记得小时候最期待清明节，因为可以跟着爷爷去扫墓，然后可以吃到好吃的青团。那种用艾草汁做的青团，绿油油的，里面是甜甜的豆沙馅。爷爷说，清明节吃青团，是为了纪念先人，也是为了祈求平安。如今爷爷不在了，但每年清明，我还是会买青团来吃，仿佛爷爷还在身边。',
    image: null,
    solarTermId: 'qingming',
    solarTermName: '清明',
    author: {
      id: 'user2',
      nickname: '青山依旧',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20man%20with%20glasses%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
    },
    createdAt: Date.now() - 86400000 * 7,
    likes: 45,
    isLiked: false
  },
  {
    id: 'story3',
    title: '夏至的一碗凉面',
    content: '每到夏至，妈妈总会给我们做凉面。那种用芝麻酱、酱油、醋、蒜末、葱花调的酱汁，拌上黄瓜丝、胡萝卜丝、豆芽，再加上一勺辣椒油，那味道，真是夏天最美味的享受。妈妈说，"冬至饺子夏至面"，夏至吃面，是为了讨个好彩头。如今离家在外，最想念的就是妈妈做的那碗凉面。',
    image: null,
    solarTermId: 'xiazhi',
    solarTermName: '夏至',
    author: {
      id: 'user3',
      nickname: '夏日清凉',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20young%20woman%20smiling%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
    },
    createdAt: Date.now() - 86400000 * 10,
    likes: 32,
    isLiked: false
  },
  {
    id: 'story4',
    title: '冬至的饺子',
    content: '北方人冬至必须吃饺子，不然会冻掉耳朵。这是奶奶从小就告诉我的。每到冬至，全家人都会围在一起包饺子，有韭菜鸡蛋馅，有白菜猪肉馅，有香菇鸡肉馅。包好的饺子，热气腾腾地端上来，蘸着醋和蒜末，一口一个，吃得心里都是暖的。如今在外工作，冬至也会自己包饺子，虽然没有家里的热闹，但那份温暖，是一样的。',
    image: null,
    solarTermId: 'dongzhi',
    solarTermName: '冬至',
    author: {
      id: 'user4',
      nickname: '北方汉子',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20man%20with%20beard%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
    },
    createdAt: Date.now() - 86400000 * 15,
    likes: 56,
    isLiked: false
  },
  {
    id: 'story5',
    title: '中秋赏月',
    content: '中秋是我最喜欢的节日，因为可以吃月饼，可以赏月。小时候，每到中秋，爸爸都会搬个小桌子到院子里，摆上月饼、石榴、苹果，然后一家人坐在院子里赏月。爸爸会给我讲嫦娥奔月的故事，讲吴刚伐桂的故事。那时候的月亮，好像特别圆，特别亮。如今在城里，很难再看到那样亮的月亮了，但那份美好的记忆，永远都在。',
    image: null,
    solarTermId: 'qiufen',
    solarTermName: '秋分',
    author: {
      id: 'user5',
      nickname: '月是故乡明',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20avatar%20of%20a%20woman%20with%20moon%20in%20background%2C%20warm%20colors%2C%20minimal%20style&image_size=square_hd'
    },
    createdAt: Date.now() - 86400000 * 20,
    likes: 41,
    isLiked: false
  }
]
