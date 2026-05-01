export interface SolarTerm {
  id: string
  name: string
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  seasonName: string
  solarDate: string
  lunarDate: string
  image: string
  brief: string
  customs: string[]
  food: string[]
  taboos: string[]
  health: string[]
  copyText: string
  relatedKeywords: string[]
}

export const solarTerms: SolarTerm[] = [
  {
    id: 'lichun',
    name: '立春',
    season: 'spring',
    seasonName: '春',
    solarDate: '2月3-5日',
    lunarDate: '正月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Lichun%20Start%20of%20Spring%20with%20cherry%20blossoms%20and%20swallows%2C%20warm%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '春回大地，万物复苏，是一年农事活动的开始。',
    customs: [
      '迎春：民间在立春前一日举行迎春活动，迎接春天和芒神。',
      '打春：用泥塑成春牛，由府县官吏象征性鞭打，劝农春耕。',
      '咬春：吃春饼、春卷、萝卜等，取咬得春根之意。',
      '戴春幡：妇女头戴春幡春胜，或贴在门上，以迎春气。'
    ],
    food: [
      '春饼：用面粉烙成薄饼，卷以豆芽、韭黄、粉丝等食用。',
      '春卷：将春饼卷馅后油炸而成，外酥里嫩。',
      '萝卜：立春吃萝卜，谓"咬春"，可解春困。',
      '五辛盘：用葱、蒜、韭、蓼蒿、芥五种辛辣蔬菜拼盘食用。'
    ],
    taboos: [
      '立春当天不宜搬家，以免惊动春神。',
      '不宜动土、动针线，以防伤春气。',
      '忌争吵，保持心情愉快，以迎祥和之气。',
      '部分地区忌讳出嫁女儿回娘家，以免带走娘家财运。'
    ],
    health: [
      '饮食宜清淡，多吃韭菜、菠菜等应季蔬菜，助阳气生发。',
      '早睡早起，适当增加户外活动，顺应春生之气。',
      '注意保暖，"春捂秋冻"，不宜过早减衣。',
      '保持心情舒畅，可多外出踏青，舒展肝气。'
    ],
    copyText: '【立春】春回大地，万物复苏。东风解冻，蜇虫始振，鱼陟负冰。愿你在新的一年里，如春风拂面，似春花绽放，所有美好如约而至。',
    relatedKeywords: ['立春', '春天', '春饼', '迎春', '打春', '咬春']
  },
  {
    id: 'yushui',
    name: '雨水',
    season: 'spring',
    seasonName: '春',
    solarDate: '2月18-20日',
    lunarDate: '正月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Yushui%20Rain%20Water%20with%20rain%20drops%20and%20bamboo%2C%20fresh%20green%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '降雨渐增，气温回升，是春雨滋润万物的时节。',
    customs: [
      '回娘屋：出嫁女儿带礼物回娘家看望父母。',
      '拉保保：父母为子女找干爹干妈，祈求健康成长。',
      '接寿：女婿给岳父母送节，祝岳父岳母长命百岁。',
      '占稻色：爆炒糯米花，预测当年稻谷收成好坏。'
    ],
    food: [
      '罐罐肉：用砂锅炖猪脚、大豆、海带等，是女婿送岳父母的礼品。',
      '龙须面：吃面条象征长寿，雨水节气吃龙须面有吉祥寓意。',
      '春笋：雨水时节春笋开始萌发，鲜嫩可口。',
      '粥品：多喝粥以养脾胃，如山药粥、红枣粥等。'
    ],
    taboos: [
      '雨水时节不宜过度操劳，宜劳逸结合。',
      '忌冒雨涉水，以防湿邪入侵。',
      '部分地区忌讳在屋檐下晾晒衣物。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '注意保暖，尤其是脚部和腹部，防止倒春寒。',
      '多吃健脾祛湿的食物，如薏米、芡实、山药等。',
      '适当运动，但不宜过度出汗。',
      '保持充足睡眠，顺应阳气生发。'
    ],
    copyText: '【雨水】好雨知时节，当春乃发生。随风潜入夜，润物细无声。愿这绵绵春雨，洗净你心中的烦忧，滋润你美好的生活。',
    relatedKeywords: ['雨水', '春雨', '罐罐肉', '回娘家', '拉保保']
  },
  {
    id: 'jingzhe',
    name: '惊蛰',
    season: 'spring',
    seasonName: '春',
    solarDate: '3月5-7日',
    lunarDate: '二月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Jingzhe%20Awakening%20of%20Insects%20with%20thunder%20and%20awakening%20animals%2C%20vibrant%20spring%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '春雷惊醒蛰伏的虫蛇，气温回升较快，春耕大忙开始。',
    customs: [
      '祭白虎：祭拜白虎，祈求平安，化解是非口舌。',
      '打小人：用香草、艾草等熏家中，驱赶霉运。',
      '吃梨：惊蛰吃梨，寓意与害虫分离，远离疾病。',
      '蒙鼓皮：古人在惊蛰日蒙鼓皮，象征雷声惊醒万物。'
    ],
    food: [
      '梨：惊蛰吃梨，可润肺止咳，生津止渴。',
      '炒豆：用盐水浸泡黄豆后炒制，象征炒虫。',
      '煎饼：山东地区吃煎饼，寓意"煎毒虫"。',
      '芋艿：江南地区吃芋艿，有"吃芋艿，不生癞"之说。'
    ],
    taboos: [
      '惊蛰前后不宜夜间外出，以防"邪祟"。',
      '部分地区忌讳嫁娶。',
      '忌在惊蛰日争吵，以免惹是非。',
      '忌杀生，宜放生积德。'
    ],
    health: [
      '饮食宜清润，多吃梨、银耳、百合等润肺食物。',
      '注意预防流感、肝病等春季高发疾病。',
      '保持心情愉悦，避免烦躁动怒。',
      '早睡早起，增加户外活动，顺应肝气生发。'
    ],
    copyText: '【惊蛰】春雷一声响，万物齐生长。蛰虫惊而出，桃李始芬芳。愿你在这充满生机的时节，如春笋般破土而出，绽放属于自己的精彩。',
    relatedKeywords: ['惊蛰', '春雷', '祭白虎', '吃梨', '打小人']
  },
  {
    id: 'chunfen',
    name: '春分',
    season: 'spring',
    seasonName: '春',
    solarDate: '3月20-22日',
    lunarDate: '二月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Chunfen%20Spring%20Equinox%20with%20balanced%20day%20and%20night%2C%20flowers%20blooming%2C%20warm%20pastel%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '昼夜平分，寒暑平衡，是一年中最宜人的时节之一。',
    customs: [
      '竖蛋：春分日尝试将鸡蛋竖立在桌面上，是流传甚广的游戏。',
      '春祭：扫墓祭祖，准备三牲祭品祭拜祖先。',
      '拜神：祭拜日月之神，祈求风调雨顺。',
      '送春牛：送春牛图，说些春耕和吉祥话。'
    ],
    food: [
      '春菜：采摘野生苋菜食用，寓意"春汤灌脏，洗涤肝肠"。',
      '汤圆：吃汤圆，寓意团圆美满。',
      '太阳糕：祭祀太阳神的糕点，寓意太阳高照。',
      '驴打滚：北方传统小吃，寓意"驴打滚，福气到"。'
    ],
    taboos: [
      '春分日不宜过度劳累，宜劳逸结合。',
      '忌大喜大悲，保持心态平和。',
      '部分地区忌讳在室外晾晒衣物过夜。',
      '忌食用过于燥热或寒凉的食物。'
    ],
    health: [
      '饮食宜平衡，寒热搭配得当，保持阴阳平衡。',
      '作息规律，保持充足睡眠。',
      '适当运动，如散步、太极拳等。',
      '保持心情舒畅，避免情绪波动。'
    ],
    copyText: '【春分】春分昼夜均，寒暑两相平。莺飞燕舞时，柳绿花更红。愿你在这平衡美好的时节，心如止水，生活如画，一切恰到好处。',
    relatedKeywords: ['春分', '竖蛋', '春祭', '春菜', '昼夜平分']
  },
  {
    id: 'qingming',
    name: '清明',
    season: 'spring',
    seasonName: '春',
    solarDate: '4月4-6日',
    lunarDate: '三月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Qingming%20Pure%20Brightness%20with%20willow%20trees%20and%20rainy%20atmosphere%2C%20serene%20green%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '春光明媚，草木繁茂，是祭祖扫墓、踏青郊游的时节。',
    customs: [
      '扫墓祭祖：携带酒菜、纸钱到坟前祭拜，为先人除草培土。',
      '踏青：外出郊游，欣赏春日美景。',
      '插柳：将柳枝插在门上或戴在头上，寓意驱邪。',
      '放风筝：在清明放风筝，寓意放走晦气。'
    ],
    food: [
      '青团：用艾草汁拌糯米粉，包裹豆沙等馅料蒸制而成。',
      '艾粄：客家人用艾草制作的糕点，有祛湿功效。',
      '清明馃：江西等地用鼠曲草制作的清明食品。',
      '润饼菜：福建地区吃润饼，寓意包福。'
    ],
    taboos: [
      '清明节前后不宜嫁娶、乔迁等喜事。',
      '扫墓时要保持肃穆，忌嬉笑打闹。',
      '忌在坟前随意拍照。',
      '孕妇、体弱老人尽量避免去墓地。'
    ],
    health: [
      '清明时节雨纷纷，注意保暖防潮，预防感冒。',
      '外出踏青注意防蚊虫叮咬。',
      '饮食宜清淡，多吃新鲜蔬菜水果。',
      '保持心情平和，缅怀先人但不宜过度悲伤。'
    ],
    copyText: '【清明】清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。在这追思先人的日子里，愿逝者安息，生者安康，珍惜当下，不负春光。',
    relatedKeywords: ['清明', '扫墓', '踏青', '青团', '插柳']
  },
  {
    id: 'guyu',
    name: '谷雨',
    season: 'spring',
    seasonName: '春',
    solarDate: '4月19-21日',
    lunarDate: '三月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Guyu%20Grain%20Rain%20with%20rice%20seedlings%20and%20spring%20rain%2C%20vibrant%20green%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '雨生百谷，是春播作物生长的关键时期，也是春茶采摘的时节。',
    customs: [
      '祭仓颉：传说仓颉造字，天雨粟，故谷雨祭祀仓颉。',
      '喝谷雨茶：采摘谷雨时节的新茶，有清火明目功效。',
      '走谷雨：青年妇女走村串亲，寓意与自然融合。',
      '禁杀五毒：张贴谷雨贴，驱赶毒虫，祈求平安。'
    ],
    food: [
      '谷雨茶：谷雨时节采摘的新茶，清香醇厚。',
      '香椿：谷雨前后香椿上市，有"雨前香椿嫩如丝"之说。',
      '乌米饭：南方部分地区用乌饭树叶捣汁蒸制米饭。',
      '燕笋：谷雨前后燕笋上市，鲜嫩可口。'
    ],
    taboos: [
      '谷雨时节忌讳在野外烧荒，以防火灾。',
      '部分地区忌讳谷雨日下雨，认为影响收成。',
      '忌过度劳累，注意劳逸结合。',
      '忌食用过于燥热的食物。'
    ],
    health: [
      '谷雨时节湿气较重，注意祛湿，多吃薏米、红豆等。',
      '早晚温差大，注意适时增减衣物。',
      '过敏体质者注意预防花粉症、过敏性鼻炎等。',
      '保持充足睡眠，适当增加户外活动。'
    ],
    copyText: '【谷雨】雨生百谷，春尽夏来。布谷啼鸣，春茶飘香。愿你在这春雨滋润的时节，播下希望的种子，收获美好的未来。',
    relatedKeywords: ['谷雨', '谷雨茶', '香椿', '祭仓颉', '走谷雨']
  },
  {
    id: 'lixia',
    name: '立夏',
    season: 'summer',
    seasonName: '夏',
    solarDate: '5月5-7日',
    lunarDate: '四月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Lixia%20Start%20of%20Summer%20with%20lotus%20leaves%20and%20pomegranate%20flowers%2C%20warm%20summer%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '夏季开始，气温显著升高，雷雨增多，农作物进入生长旺季。',
    customs: [
      '称人：立夏吃罢中饭，称体重，祈求健康长寿。',
      '尝新：品尝应季新鲜蔬果，如樱桃、青梅、蚕豆等。',
      '斗蛋：用煮熟的鸡蛋相斗，是儿童喜爱的游戏。',
      '饯春：古人有"饯春"之举，饮酒作乐，送别春天。'
    ],
    food: [
      '立夏蛋：将鸡蛋或鸭蛋煮熟，是立夏传统食品。',
      '立夏饭：用糯米、豌豆、蚕豆、竹笋等煮成的五色饭。',
      '七家粥：邻里间互赠豆米，煮粥共食。',
      '青梅：立夏时节青梅成熟，可泡酒或腌制食用。'
    ],
    taboos: [
      '立夏日忌坐门槛，认为会带来疾病。',
      '部分地区忌讳在立夏日午睡。',
      '忌穿单衣，注意"春捂"。',
      '忌争吵，保持心情愉快。'
    ],
    health: [
      '立夏过后天气渐热，注意防暑降温。',
      '饮食宜清淡，多吃苦瓜、莲子等清热去火食物。',
      '保证充足睡眠，适当午休。',
      '保持心情平静，避免烦躁不安。'
    ],
    copyText: '【立夏】春意阑珊夏初长，绿阴遍野暖风生。梅子黄时雨，蛙声阵阵鸣。愿你在这热情洋溢的夏日，如夏花般绚烂，似清风般自在。',
    relatedKeywords: ['立夏', '称人', '斗蛋', '尝新', '立夏蛋']
  },
  {
    id: 'xiaoman',
    name: '小满',
    season: 'summer',
    seasonName: '夏',
    solarDate: '5月20-22日',
    lunarDate: '四月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Xiaoman%20Grain%20Buds%20with%20wheat%20fields%20and%20rivers%2C%20golden%20green%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '夏熟作物籽粒开始饱满，但尚未成熟，故曰"小满"。',
    customs: [
      '祭车神：祭拜水车、牛车、丝车三车神，祈求水源充足。',
      '祭蚕神：江浙地区祭拜蚕神，祈求蚕茧丰收。',
      '抢水：农民举行抢水仪式，象征引车入水。',
      '食苦菜：吃苦菜，有清热解毒功效。'
    ],
    food: [
      '苦菜：小满时节吃苦菜，可清热解毒。',
      '枇杷：小满前后枇杷成熟，酸甜可口。',
      '苦瓜：夏季吃苦瓜，清热降火。',
      '枸杞苗：新鲜枸杞苗，可凉拌或炒食。'
    ],
    taboos: [
      '小满时节忌讳久待空调房，注意通风。',
      '忌过度贪凉，以防感冒。',
      '部分地区忌讳小满日无雨。',
      '忌食用过于辛辣燥热的食物。'
    ],
    health: [
      '小满时节湿热交加，注意清热祛湿。',
      '多吃苦味食物，如苦菜、苦瓜等。',
      '适当运动，但避免在烈日下暴晒。',
      '保持充足睡眠，注意劳逸结合。'
    ],
    copyText: '【小满】小满小满，麦粒渐满。物至于此，小得盈满。人生最好是小满，花未全开月未圆。愿你在这恰到好处的时节，收获属于自己的小确幸。',
    relatedKeywords: ['小满', '祭车神', '苦菜', '蚕神', '抢水']
  },
  {
    id: 'mangzhong',
    name: '芒种',
    season: 'summer',
    seasonName: '夏',
    solarDate: '6月5-7日',
    lunarDate: '五月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Mangzhong%20Grain%20in%20Ear%20with%20rice%20planting%20and%20wheat%20harvest%2C%20golden%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '麦类等有芒作物成熟，也是夏播作物播种的最忙时节。',
    customs: [
      '送花神：芒种饯送花神归位，表达对花神的感激。',
      '安苗：种完水稻后祭祀五谷神，祈求丰收。',
      '打泥巴仗：贵州侗族青年男女在插秧时打泥巴仗。',
      '煮梅：芒种前后梅子成熟，煮梅食用。'
    ],
    food: [
      '青梅：芒种时节青梅成熟，煮梅或泡酒。',
      '君踏菜：南方地区吃君踏菜，有清热解毒功效。',
      '鸡蛋：芒种吃蛋，寓意身体健康。',
      '酸梅汤：夏日消暑解渴的传统饮品。'
    ],
    taboos: [
      '芒种时节忌讳在正午时分外出。',
      '忌贪凉饮冷，以防伤脾胃。',
      '部分地区忌讳芒种日打雷。',
      '忌过度劳累，注意休息。'
    ],
    health: [
      '芒种时节天气炎热，注意防暑降温。',
      '多吃清热解暑食物，如绿豆、西瓜、冬瓜等。',
      '保证充足睡眠，适当午休。',
      '保持心情平静，避免烦躁。'
    ],
    copyText: '【芒种】芒种忙忙种，夏至谷怀胎。螳螂生，鵙始鸣，反舌无声。在这忙碌的时节，愿你辛勤耕耘，收获满满，不负韶华，不负时光。',
    relatedKeywords: ['芒种', '送花神', '煮梅', '安苗', '插秧']
  },
  {
    id: 'xiazhi',
    name: '夏至',
    season: 'summer',
    seasonName: '夏',
    solarDate: '6月21-22日',
    lunarDate: '五月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Xiazhi%20Summer%20Solstice%20with%20lotus%20flowers%20and%20sunlight%2C%20warm%20summer%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '一年中白昼最长的一天，也是炎热夏季的开始。',
    customs: [
      '祭神祀祖：夏至日举行祭神仪式，祈求消灾年丰。',
      '食面：北方有"冬至饺子夏至面"的习俗。',
      '消夏避伏：妇女互赠扇子、脂粉等物，以避夏。',
      '吃夏至饼：用麦粉制作薄饼，夹以青菜、豆腐等食用。'
    ],
    food: [
      '凉面：夏至吃凉面，寓意降温防暑。',
      '夏至饼：麦粉制作的薄饼，是夏至传统食品。',
      '馄饨：江南地区夏至吃馄饨，寓意团圆。',
      '荔枝：夏至前后荔枝成熟，鲜甜可口。'
    ],
    taboos: [
      '夏至日忌讳在阳光下暴晒。',
      '忌贪凉过度，如久吹空调、大量吃冷饮。',
      '部分地区忌讳夏至日雷雨。',
      '忌熬夜，保证充足睡眠。'
    ],
    health: [
      '夏至时节天气炎热，注意防暑降温。',
      '多吃清热解暑食物，如绿豆、西瓜、苦瓜等。',
      '适当午睡，补充睡眠。',
      '保持心情平静，"心静自然凉"。'
    ],
    copyText: '【夏至】夏至昼最长，炎炎夏日长。鹿角解，蝉始鸣，半夏生。愿你在这热情似火的夏日，如夏花般绚烂，似清风般自在，享受每一个美好的当下。',
    relatedKeywords: ['夏至', '夏至面', '祭神', '凉面', '消夏']
  },
  {
    id: 'xiaoshu',
    name: '小暑',
    season: 'summer',
    seasonName: '夏',
    solarDate: '7月6-8日',
    lunarDate: '六月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Xiaoshu%20Minor%20Heat%20with%20lotus%20and%20crickets%2C%20warm%20summer%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '天气开始炎热，但还不是最热，故曰"小暑"。',
    customs: [
      '吃暑羊：山东等地在小暑时节吃羊肉，有"吃暑羊"习俗。',
      '尝新米：品尝新收割的稻米，祭祀祖先。',
      '晒书画衣物：农历六月初六晒书晒衣，防霉防蛀。',
      '食新：品尝新收获的粮食，祈求五谷丰登。'
    ],
    food: [
      '羊肉：小暑吃羊肉，有温补功效。',
      '新米：尝新米，寓意丰收。',
      '黄鳝：小暑前后黄鳝最为肥美，有"小暑黄鳝赛人参"之说。',
      '莲藕：小暑时节莲藕上市，清热解暑。'
    ],
    taboos: [
      '小暑时节忌讳过度劳累。',
      '忌在烈日下长时间暴晒。',
      '忌贪凉饮冷，损伤脾胃。',
      '部分地区忌讳小暑日不热。'
    ],
    health: [
      '小暑时节天气炎热，注意防暑降温。',
      '多吃清热祛湿食物，如绿豆、薏米、冬瓜等。',
      '保证充足睡眠，适当午休。',
      '保持心情舒畅，避免烦躁。'
    ],
    copyText: '【小暑】小暑不足畏，深居如退藏。温风至，蟋蟀居壁，鹰始鸷。愿你在这炎炎夏日，找到属于自己的清凉，享受生活的美好。',
    relatedKeywords: ['小暑', '吃暑羊', '尝新', '晒书', '黄鳝']
  },
  {
    id: 'dashu',
    name: '大暑',
    season: 'summer',
    seasonName: '夏',
    solarDate: '7月22-24日',
    lunarDate: '六月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Dashu%20Major%20Heat%20with%20firefly%20and%20pomegranate%2C%20hot%20summer%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '一年中最热的时节，高温酷热，雷雨频繁。',
    customs: [
      '送大暑船：浙江台州地区送大暑船，祈求平安。',
      '吃仙草：广东等地吃仙草（凉粉），消暑降火。',
      '喝暑羊：山东地区喝羊肉汤，温补身体。',
      '饮伏茶：饮用清凉解暑的茶水，预防中暑。'
    ],
    food: [
      '仙草：大暑吃仙草，清热解毒。',
      '羊肉汤：温补身体，冬病夏治。',
      '荔枝：福建莆田大暑吃荔枝，称为"过大暑"。',
      '凤梨：台湾地区大暑吃凤梨，寓意吉祥。'
    ],
    taboos: [
      '大暑时节忌讳在正午外出。',
      '忌大量食用生冷食物。',
      '忌在空调房久待，注意通风。',
      '部分地区忌讳大暑日无雨。'
    ],
    health: [
      '大暑时节天气炎热，注意防暑降温。',
      '多吃清热解暑食物，如绿豆、西瓜、冬瓜等。',
      '适当午休，补充睡眠。',
      '保持心情平静，避免情绪激动。'
    ],
    copyText: '【大暑】大暑三秋近，林钟九夏移。腐草为萤，土润溽暑，大雨时行。愿你在这最热的时节，心静如水，清凉自在，笑对炎炎夏日。',
    relatedKeywords: ['大暑', '仙草', '送大暑船', '羊肉汤', '伏茶']
  },
  {
    id: 'liqiu',
    name: '立秋',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '8月7-9日',
    lunarDate: '七月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Liqiu%20Start%20of%20Autumn%20with%20maple%20leaves%20and%20harvest%2C%20warm%20autumn%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '秋季开始，气温逐渐下降，是收获的季节。',
    customs: [
      '贴秋膘：立秋吃肉食，以补养身体，准备过冬。',
      '咬秋：吃西瓜、啃秋桃等，寓意咬住秋天。',
      '秋社：祭祀土地神，庆祝丰收。',
      '摸秋：中秋之夜到瓜田摸取瓜果，寓意吉祥。'
    ],
    food: [
      '肉类：贴秋膘吃肉，如红烧肉、炖鸡等。',
      '西瓜：咬秋吃西瓜，寓意告别夏天。',
      '秋桃：立秋吃秋桃，寓意长寿。',
      '茄子：立秋吃茄子，有"立夏栽茄子，立秋吃茄子"之说。'
    ],
    taboos: [
      '立秋日忌讳在室外睡觉。',
      '忌过度劳累，注意休息。',
      '部分地区忌讳立秋日打雷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '立秋时节天气转凉，注意保暖，预防感冒。',
      '饮食宜温润，多吃润肺生津食物，如梨、银耳等。',
      '适当增加户外活动，顺应秋气。',
      '保持心情舒畅，避免悲秋情绪。'
    ],
    copyText: '【立秋】风吹一片叶，万物已惊秋。凉风至，白露降，寒蝉鸣。愿你在这丰收的季节，收获满满的幸福，迎接美好的明天。',
    relatedKeywords: ['立秋', '贴秋膘', '咬秋', '秋社', '摸秋']
  },
  {
    id: 'chushu',
    name: '处暑',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '8月22-24日',
    lunarDate: '七月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Chushu%20End%20of%20Heat%20with%20golden%20fields%20and%20clear%20sky%2C%20warm%20autumn%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '炎热暑天结束，气温逐渐下降，秋高气爽。',
    customs: [
      '出游迎秋：处暑后秋意渐浓，适合外出秋游。',
      '开渔节：沿海地区举行开渔节，庆祝渔业丰收。',
      '放河灯：中元时节放河灯，祭祀亡魂。',
      '吃鸭子：处暑吃鸭子，有温补功效。'
    ],
    food: [
      '鸭子：处暑吃鸭子，滋阴润燥。',
      '龙眼：处暑前后龙眼成熟，甘甜可口。',
      '白丸子：糯米制成的白丸子，寓意团圆。',
      '酸梅汤：消暑解渴的传统饮品。'
    ],
    taboos: [
      '处暑时节忌讳过度贪凉。',
      '忌熬夜，保证充足睡眠。',
      '部分地区忌讳处暑日下雨。',
      '忌食用过于辛辣燥热的食物。'
    ],
    health: [
      '处暑时节天气转凉，注意保暖，预防感冒。',
      '饮食宜滋阴润燥，多吃梨、银耳、百合等。',
      '适当运动，如散步、登山等。',
      '保持心情舒畅，顺应秋气收敛。'
    ],
    copyText: '【处暑】处暑无三日，新凉直万金。鹰乃祭鸟，天地始肃，禾乃登。愿你在这秋高气爽的时节，如秋叶般静美，似秋水般澄澈。',
    relatedKeywords: ['处暑', '吃鸭子', '开渔节', '迎秋', '放河灯']
  },
  {
    id: 'bailu',
    name: '白露',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '9月7-9日',
    lunarDate: '八月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Bailu%20White%20Dew%20with%20dewdrops%20on%20reeds%20and%20wild%20geese%2C%20serene%20autumn%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '昼夜温差增大，清晨草木上有白色露珠，故曰"白露"。',
    customs: [
      '祭禹王：江苏太湖地区祭祀大禹，祈求平安。',
      '吃龙眼：福建等地白露吃龙眼，有大补之说。',
      '饮白露茶：采摘白露时节的茶叶，清香醇厚。',
      '酿白露酒：用糯米等酿酒，称为"白露米酒"。'
    ],
    food: [
      '龙眼：白露吃龙眼，温补身体。',
      '白露茶：白露时节采摘的茶叶，清香醇厚。',
      '米酒：白露时节酿酒，香甜可口。',
      '番薯：白露吃番薯，有健脾益胃功效。'
    ],
    taboos: [
      '白露时节忌讳在室外露宿。',
      '忌贪凉，注意"秋冻"适度。',
      '部分地区忌讳白露日打雷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '白露时节昼夜温差大，注意适时增减衣物。',
      '饮食宜温润，多吃润肺生津食物。',
      '适当运动，增强体质。',
      '保持充足睡眠，顺应秋气收敛。'
    ],
    copyText: '【白露】白露秋风夜，一夜凉一夜。鸿雁来，玄鸟归，群鸟养羞。愿你在这诗意满满的时节，如白露般纯净，似秋月般明亮。',
    relatedKeywords: ['白露', '祭禹王', '龙眼', '白露茶', '米酒']
  },
  {
    id: 'qiufen',
    name: '秋分',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '9月22-24日',
    lunarDate: '八月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Qiufen%20Autumn%20Equinox%20with%20harvest%20moon%20and%20osmanthus%2C%20warm%20golden%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '昼夜再次平分，也是秋收、秋耕、秋种的重要时节。',
    customs: [
      '祭月：秋分曾是传统的祭月节，中秋由秋分祭月演变而来。',
      '送秋牛：送秋牛图，说些吉祥话。',
      '粘雀子嘴：吃汤圆，将汤圆插在田边，粘住雀子嘴。',
      '竖蛋：秋分日尝试将鸡蛋竖立，与春分类似。'
    ],
    food: [
      '汤圆：秋分吃汤圆，寓意团圆。',
      '桂花酒：秋分前后桂花盛开，可酿酒或泡茶。',
      '螃蟹：秋分时节螃蟹最为肥美。',
      '秋月梨：秋分前后梨子成熟，润肺止咳。'
    ],
    taboos: [
      '秋分日忌讳过度劳累。',
      '忌大喜大悲，保持心态平和。',
      '部分地区忌讳秋分日下雨。',
      '忌食用过于燥热或寒凉的食物。'
    ],
    health: [
      '秋分时节天气干燥，注意润肺防燥。',
      '多吃润肺生津食物，如梨、银耳、百合等。',
      '适当运动，如登山、慢跑等。',
      '保持心情舒畅，避免悲秋情绪。'
    ],
    copyText: '【秋分】秋分昼夜均，寒暑两相平。雷始收声，蛰虫坯户，水始涸。愿你在这平衡美好的时节，心如止水，生活如画，一切恰到好处。',
    relatedKeywords: ['秋分', '祭月', '送秋牛', '汤圆', '桂花']
  },
  {
    id: 'hanlu',
    name: '寒露',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '10月8-9日',
    lunarDate: '九月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Hanlu%20Cold%20Dew%20with%20chrysanthemum%20and%20frost%2C%20cool%20autumn%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '气温更低，露水更冷，即将凝结成霜，故曰"寒露"。',
    customs: [
      '赏菊：寒露时节菊花盛开，赏菊、饮菊花酒。',
      '登高：重阳节前后登高望远，寓意避灾。',
      '插茱萸：重阳节插茱萸，驱邪避灾。',
      '饮菊花酒：菊花泡酒，有养生功效。'
    ],
    food: [
      '菊花：赏菊、饮菊花茶、菊花酒。',
      '螃蟹：寒露前后螃蟹肥美，是食用佳品。',
      '芝麻：寒露吃芝麻，有润肠通便功效。',
      '柿子：寒露前后柿子成熟，香甜可口。'
    ],
    taboos: [
      '寒露时节忌讳在室外露宿。',
      '忌贪凉，注意保暖。',
      '部分地区忌讳寒露日打雷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '寒露时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温润，多吃润肺生津食物。',
      '适当运动，增强体质。',
      '保持心情舒畅，顺应秋气收敛。'
    ],
    copyText: '【寒露】寒露惊秋晚，朝看菊渐黄。鸿雁来宾，雀入大水为蛤，菊有黄华。愿你在这寒露时节，如菊花般傲然绽放，似秋风般清爽自在。',
    relatedKeywords: ['寒露', '菊花', '登高', '螃蟹', '芝麻']
  },
  {
    id: 'shuangjiang',
    name: '霜降',
    season: 'autumn',
    seasonName: '秋',
    solarDate: '10月23-24日',
    lunarDate: '九月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Shuangjiang%20Frost%20Descent%20with%20maple%20leaves%20and%20frost%2C%20warm%20red%20autumn%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '气温骤降，开始出现初霜，是秋季最后一个节气。',
    customs: [
      '赏菊：霜降时节菊花盛开，赏菊、饮菊花酒。',
      '吃柿子：霜降吃柿子，有"霜降吃丁柿，不会流鼻涕"之说。',
      '进补：霜降时节是进补的好时机，有"补冬不如补霜降"之说。',
      '扫墓：部分地区霜降时节扫墓祭祖。'
    ],
    food: [
      '柿子：霜降吃柿子，润肺生津。',
      '鸭子：霜降进补吃鸭子，滋阴润燥。',
      '牛肉：霜降吃牛肉，温补身体。',
      '萝卜：霜降吃萝卜，有"十月萝卜小人参"之说。'
    ],
    taboos: [
      '霜降时节忌讳在室外露宿。',
      '忌过度贪凉，注意保暖。',
      '部分地区忌讳霜降日无霜。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '霜降时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '适当运动，增强体质。',
      '保持心情舒畅，顺应秋气收敛。'
    ],
    copyText: '【霜降】霜降三旬后，蓂馀一叶秋。豺乃祭兽，草木黄落，蛰虫咸俯。愿你在这霜降时节，如秋叶般绚烂，似秋阳般温暖，迎接冬日的到来。',
    relatedKeywords: ['霜降', '柿子', '进补', '菊花', '萝卜']
  },
  {
    id: 'lidong',
    name: '立冬',
    season: 'winter',
    seasonName: '冬',
    solarDate: '11月7-8日',
    lunarDate: '十月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Lidong%20Start%20of%20Winter%20with%20snow%20and%20plum%20blossoms%2C%20cool%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '冬季开始，气温显著下降，是收藏、进补的时节。',
    customs: [
      '迎冬：古代皇帝在立冬举行迎冬仪式，祭祀冬神。',
      '贺冬：立冬时节亲友互相拜贺，称为"拜冬"。',
      '补冬：立冬时节进补，为过冬储备能量。',
      '吃饺子：北方立冬吃饺子，有"立冬不端饺子碗，冻掉耳朵没人管"之说。'
    ],
    food: [
      '饺子：立冬吃饺子，寓意团圆。',
      '羊肉：立冬进补吃羊肉，温补身体。',
      '鸡鸭：立冬吃鸡鸭，滋补身体。',
      '萝卜：立冬吃萝卜，有"冬吃萝卜夏吃姜"之说。'
    ],
    taboos: [
      '立冬时节忌讳过度劳累。',
      '忌在室外长时间待着，注意保暖。',
      '部分地区忌讳立冬日不冷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '立冬时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '适当运动，但避免过度出汗。'
    ],
    copyText: '【立冬】立冬天地闭，寒来万物藏。水始冰，地始冻，雉入大水为蜃。愿你在这冬日伊始，如冬日暖阳般温暖，似傲雪寒梅般坚强。',
    relatedKeywords: ['立冬', '饺子', '补冬', '羊肉', '迎冬']
  },
  {
    id: 'xiaoxue',
    name: '小雪',
    season: 'winter',
    seasonName: '冬',
    solarDate: '11月22-23日',
    lunarDate: '十月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Xiaoxue%20Minor%20Snow%20with%20light%20snow%20and%20pine%20trees%2C%20cool%20white%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '开始下雪，但雪量较小，故曰"小雪"。',
    customs: [
      '腌腊肉：小雪时节腌制腊肉，是传统的冬令食品。',
      '腌菜：南方地区腌菜，以备冬季食用。',
      '吃糍粑：南方地区小雪吃糍粑，有"十月朝，糍粑禄禄烧"之说。',
      '晒鱼干：台湾地区小雪晒鱼干，储存过冬。'
    ],
    food: [
      '腊肉：小雪腌制腊肉，风味独特。',
      '糍粑：小雪吃糍粑，香甜可口。',
      '鱼干：小雪晒鱼干，便于储存。',
      '萝卜：小雪吃萝卜，健脾益胃。'
    ],
    taboos: [
      '小雪时节忌讳过度劳累。',
      '忌在室外长时间待着，注意保暖。',
      '部分地区忌讳小雪日不下雪。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '小雪时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '保持心情舒畅，预防"冬季抑郁症"。'
    ],
    copyText: '【小雪】小雪时节雪纷飞，寒梅初绽暗香来。虹藏不见，天气上升，闭塞而成冬。愿你在这飘雪的时节，如雪花般纯净，似冬日般静谧。',
    relatedKeywords: ['小雪', '腊肉', '腌菜', '糍粑', '鱼干']
  },
  {
    id: 'daxue',
    name: '大雪',
    season: 'winter',
    seasonName: '冬',
    solarDate: '12月6-8日',
    lunarDate: '十一月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Daxue%20Major%20Snow%20with%20heavy%20snow%20and%20pine%20trees%2C%20white%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '雪量增大，气温更低，是进补的大好时节。',
    customs: [
      '腌肉：大雪时节腌制"咸货"，是传统的冬令食品。',
      '观赏封河：北方地区大雪时节河流封冻，人们在冰上游玩。',
      '进补：大雪时节是进补的最佳时机，有"冬天进补，开春打虎"之说。',
      '喝红薯粥：民间有"碌碡顶了门，光喝红黏粥"之说。'
    ],
    food: [
      '腌肉：大雪腌制咸肉，风味独特。',
      '红薯粥：大雪喝红薯粥，健脾益胃。',
      '羊肉：大雪进补吃羊肉，温补身体。',
      '萝卜：大雪吃萝卜，有"冬吃萝卜"之说。'
    ],
    taboos: [
      '大雪时节忌讳在室外长时间待着。',
      '忌过度劳累，注意休息。',
      '部分地区忌讳大雪日无雪。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '大雪时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '适当运动，增强体质。'
    ],
    copyText: '【大雪】大雪纷飞兆丰年，银装素裹美如画。鹃鸥不鸣，虎始交，荔挺出。愿你在这大雪纷飞的时节，如冬日暖阳般温暖，似傲雪青松般坚韧。',
    relatedKeywords: ['大雪', '腌肉', '进补', '红薯粥', '羊肉']
  },
  {
    id: 'dongzhi',
    name: '冬至',
    season: 'winter',
    seasonName: '冬',
    solarDate: '12月21-23日',
    lunarDate: '十一月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Dongzhi%20Winter%20Solstice%20with%20full%20moon%20and%20snow%2C%20serene%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '一年中白昼最短的一天，也是重要的传统节日。',
    customs: [
      '祭天祭祖：冬至日举行祭天祭祖仪式，是古代重要的礼仪活动。',
      '吃饺子：北方冬至吃饺子，有"冬至饺子夏至面"之说。',
      '吃汤圆：南方冬至吃汤圆，寓意团圆美满。',
      '数九：从冬至开始"数九"，每九天为一个"九"。'
    ],
    food: [
      '饺子：北方冬至吃饺子，寓意团圆。',
      '汤圆：南方冬至吃汤圆，寓意团圆。',
      '羊肉汤：冬至喝羊肉汤，温补身体。',
      '冬至面：南方部分地区吃冬至面，寓意长寿。'
    ],
    taboos: [
      '冬至日忌讳在室外长时间待着。',
      '忌过度劳累，注意休息。',
      '部分地区忌讳冬至日打雷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '冬至时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '保持心情舒畅，注意养生。'
    ],
    copyText: '【冬至】冬至大如年，人间小团圆。蚯蚓结，麋角解，水泉动。愿你在这最长的夜晚，与家人团圆，如冬日暖阳般温暖，似寒梅般坚强。',
    relatedKeywords: ['冬至', '饺子', '汤圆', '数九', '祭天']
  },
  {
    id: 'xiaohan',
    name: '小寒',
    season: 'winter',
    seasonName: '冬',
    solarDate: '1月5-7日',
    lunarDate: '十二月初五前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Xiaohan%20Minor%20Cold%20with%20icy%20landscape%20and%20plum%20blossoms%2C%20cool%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '天气寒冷，但还不是最冷，故曰"小寒"。',
    customs: [
      '探梅：小寒时节腊梅盛开，是赏梅的好时机。',
      '吃腊八粥：腊八节前后喝腊八粥，寓意丰收。',
      '腌菜：小寒时节腌菜，以备春节食用。',
      '准备年货：小寒临近春节，开始准备年货。'
    ],
    food: [
      '腊八粥：小寒喝腊八粥，滋补身体。',
      '腊梅：小寒赏梅、饮梅花茶。',
      '羊肉：小寒吃羊肉，温补身体。',
      '糯米饭：小寒吃糯米饭，寓意团圆。'
    ],
    taboos: [
      '小寒时节忌讳在室外长时间待着。',
      '忌过度劳累，注意休息。',
      '部分地区忌讳小寒日不冷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '小寒时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '适当运动，增强体质。'
    ],
    copyText: '【小寒】小寒连大吕，欢鹊垒新巢。雁北乡，鹊始巢，雉始鸲。愿你在这小寒时节，如腊梅般傲雪绽放，似冬日暖阳般温暖。',
    relatedKeywords: ['小寒', '腊八粥', '腊梅', '羊肉', '糯米饭']
  },
  {
    id: 'dahan',
    name: '大寒',
    season: 'winter',
    seasonName: '冬',
    solarDate: '1月20-21日',
    lunarDate: '十二月二十前后',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20style%20illustration%20of%20Dahan%20Major%20Cold%20with%20spring%20festival%20atmosphere%20and%20lanterns%2C%20warm%20red%20winter%20colors%2C%20elegant%20ink%20painting%20style&image_size=square_hd',
    brief: '一年中最冷的时节，也是春节临近、年味渐浓的时节。',
    customs: [
      '迎年：大寒临近春节，开始准备过年事宜。',
      '尾牙祭：商家举行尾牙祭，犒劳员工。',
      '喝鸡汤：大寒时节喝老母鸡汤，有温补功效。',
      '准备年货：大寒时节是采购年货的高峰期。'
    ],
    food: [
      '老母鸡汤：大寒喝老母鸡汤，温补身体。',
      '腊八粥：大寒喝腊八粥，滋补身体。',
      '年糕：大寒吃年糕，寓意"年年高"。',
      '腊味：大寒时节腊味飘香，是传统年节食品。'
    ],
    taboos: [
      '大寒时节忌讳在室外长时间待着。',
      '忌过度劳累，注意休息。',
      '部分地区忌讳大寒日不冷。',
      '忌食用过于寒凉的食物。'
    ],
    health: [
      '大寒时节天气寒冷，注意保暖，预防感冒。',
      '饮食宜温补，适当进补。',
      '早睡晚起，顺应冬气收藏。',
      '保持心情愉快，迎接春节到来。'
    ],
    copyText: '【大寒】大寒时节岁将阑，春信将至梅先知。鸡始乳，征鸟厉疾，水泽腹坚。愿你在这岁末时节，如寒梅般傲雪绽放，似春风般充满希望，迎接新年的到来。',
    relatedKeywords: ['大寒', '迎年', '尾牙', '鸡汤', '年糕']
  }
]

export const seasonMap: Record<string, { name: string; color: string; label: string }> = {
  spring: { name: '春季', color: '#7cb342', label: '春' },
  summer: { name: '夏季', color: '#ff9800', label: '夏' },
  autumn: { name: '秋季', color: '#e64a19', label: '秋' },
  winter: { name: '冬季', color: '#03a9f4', label: '冬' }
}

export const getSolarTermById = (id: string): SolarTerm | undefined => {
  return solarTerms.find(st => st.id === id)
}

export const getSolarTermsBySeason = (season: string): SolarTerm[] => {
  return solarTerms.filter(st => st.season === season)
}

export const searchSolarTerms = (keyword: string): SolarTerm[] => {
  if (!keyword.trim()) return solarTerms
  const lowerKeyword = keyword.toLowerCase()
  return solarTerms.filter(st => 
    st.name.includes(keyword) ||
    st.relatedKeywords.some(k => k.toLowerCase().includes(lowerKeyword)) ||
    st.customs.some(c => c.toLowerCase().includes(lowerKeyword))
  )
}
