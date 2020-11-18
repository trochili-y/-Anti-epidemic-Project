var epidemicData = null;
var cityName = "";
var barBox = document.getElementById("bar_box");
var bar_timer = null;

// 是否可以刷新，记录刷新时间
var canRefresh = true;
var refreshDay = 0;
var refreshHours = 0;
if (localStorage.getItem("refreshDay") != null) {
    refreshDay = localStorage.getItem("refreshDay");
}
if (localStorage.getItem("refreshHours") != null) {
    refreshHours = localStorage.getItem("refreshHours");
}

// 云浮数据
var yunFuData = {
    cityName: "云浮",
    currentConfirmedCount: 0,
    confirmedCount: 0,
    suspectedCount: 0,
    curedCount: 0,
    deadCount: 0,
    locationId: 0,
};
// 东沙群岛
var dongShaData = {
    cityName: "东沙群岛",
    currentConfirmedCount: 0,
    confirmedCount: 0,
    suspectedCount: 0,
    curedCount: 0,
    deadCount: 0,
    locationId: 0,
};
// 广东省数据
var gdObj = {};
var gdData = [{
    cityName: "云浮",
    currentConfirmedCount: 0,
    confirmedCount: 0,
    suspectedCount: 0,
    curedCount: 0,
    deadCount: 0,
    locationId: 0,
},
{
    cityName: "东沙群岛",
    currentConfirmedCount: 0,
    confirmedCount: 0,
    suspectedCount: 0,
    curedCount: 0,
    deadCount: 0,
    locationId: 0,
},
{
    cityName: "广州",
    currentConfirmedCount: 38,
    confirmedCount: 773,
    suspectedCount: 9,
    curedCount: 734,
    deadCount: 1,
    locationId: 440100,
},
{
    cityName: "佛山",
    currentConfirmedCount: 1,
    confirmedCount: 102,
    suspectedCount: 1,
    curedCount: 101,
    deadCount: 0,
    locationId: 440600,
},
{
    cityName: "东莞",
    currentConfirmedCount: 1,
    confirmedCount: 101,
    suspectedCount: 0,
    curedCount: 99,
    deadCount: 1,
    locationId: 441900,
},
{
    cityName: "深圳",
    currentConfirmedCount: 0,
    confirmedCount: 471,
    suspectedCount: 1,
    curedCount: 468,
    deadCount: 3,
    locationId: 440300,
},
{
    cityName: "珠海",
    currentConfirmedCount: 0,
    confirmedCount: 110,
    suspectedCount: 1,
    curedCount: 109,
    deadCount: 1,
    locationId: 440400,
},
{
    cityName: "中山",
    currentConfirmedCount: 0,
    confirmedCount: 69,
    suspectedCount: 0,
    curedCount: 69,
    deadCount: 0,
    locationId: 442000,
},
{
    cityName: "惠州",
    currentConfirmedCount: 0,
    confirmedCount: 62,
    suspectedCount: 0,
    curedCount: 62,
    deadCount: 0,
    locationId: 441300,
},
{
    cityName: "湛江",
    currentConfirmedCount: 0,
    confirmedCount: 30,
    suspectedCount: 2,
    curedCount: 30,
    deadCount: 0,
    locationId: 440800,
},
{
    cityName: "汕头",
    currentConfirmedCount: 0,
    confirmedCount: 26,
    suspectedCount: 0,
    curedCount: 26,
    deadCount: 0,
    locationId: 440500,
},
{
    cityName: "江门",
    currentConfirmedCount: 0,
    confirmedCount: 24,
    suspectedCount: 0,
    curedCount: 24,
    deadCount: 0,
    locationId: 440700,
},
{
    cityName: "肇庆",
    currentConfirmedCount: 0,
    confirmedCount: 20,
    suspectedCount: 0,
    curedCount: 19,
    deadCount: 1,
    locationId: 441200,
},
{
    cityName: "梅州",
    currentConfirmedCount: 0,
    confirmedCount: 17,
    suspectedCount: 0,
    curedCount: 17,
    deadCount: 0,
    locationId: 441400,
},
{
    cityName: "阳江",
    currentConfirmedCount: 0,
    confirmedCount: 14,
    suspectedCount: 0,
    curedCount: 14,
    deadCount: 0,
    locationId: 441700,
},
{
    cityName: "茂名",
    currentConfirmedCount: 0,
    confirmedCount: 14,
    suspectedCount: 0,
    curedCount: 14,
    deadCount: 0,
    locationId: 440900,
},
{
    cityName: "清远",
    currentConfirmedCount: 0,
    confirmedCount: 12,
    suspectedCount: 0,
    curedCount: 12,
    deadCount: 0,
    locationId: 441800,
},
{
    cityName: "揭阳",
    currentConfirmedCount: 0,
    confirmedCount: 11,
    suspectedCount: 0,
    curedCount: 11,
    deadCount: 0,
    locationId: 445200,
},
{
    cityName: "韶关",
    currentConfirmedCount: 0,
    confirmedCount: 10,
    suspectedCount: 0,
    curedCount: 9,
    deadCount: 1,
    locationId: 440200,
},
{
    cityName: "潮州",
    currentConfirmedCount: 0,
    confirmedCount: 7,
    suspectedCount: 0,
    curedCount: 7,
    deadCount: 0,
    locationId: 445100,
},
{
    cityName: "汕尾",
    currentConfirmedCount: 0,
    confirmedCount: 6,
    suspectedCount: 0,
    curedCount: 6,
    deadCount: 0,
    locationId: 441500,
},
{
    cityName: "河源",
    currentConfirmedCount: 0,
    confirmedCount: 5,
    suspectedCount: 0,
    curedCount: 5,
    deadCount: 0,
    locationId: 441600,
},
];
// 如果缓存有数据就拿过来
if (localStorage.getItem("gdData") != null) {
    // 字符串转为数组
    gdData = JSON.parse(localStorage.getItem("gdData"));
}

// 谣言
var posIndex = 0;
var rumorData = [
    {
        "id": "7c47a1e932ab4a0ad72ba92294b99245",
        "date": "2020-09-15",
        "title": "9月13日全国新增49名新冠确诊病例，分布多省市",
        "explain": "谣言",
        "imgsrc": "images/ccniumVHEPYdE41NyrneXB.jfif",
        "markstyle": "fake",
        "url": "https://vp.fact.qq.com/article?id=7c47a1e932ab4a0ad72ba92294b99245",
        "desc": "网传视频中混淆了无症状感染者和确诊病例的概念，将两者简单相加得出了“新增49名病例”的结论，实际上，49名病例中有39名为无症状感染者，无症状感染者不是确诊病例。\n9月13日的新增确诊病例和无症状感染者均为境外输入。境外入境人员检测、隔离14天的规定一直没变过，所有入境人员从入境到卫生检疫、检测、转运全部是按照规定实行无缝对接和闭环管理，并没有进入社会，确诊患者已分布在全国多地的说法不属实。",
        "author": "解放日报•上观新闻运营的辟谣新闻和辟谣服务网络平台"
    },
    {
        "id": "60df9d85d6bfa16c628dc3549cded1ff",
        "date": "2020-09-10",
        "title": "新冠肺炎男性患者的死亡率更高",
        "explain": "确实如此",
        "imgsrc": "images/2umhxZmfhc2AdEJZwp7xdA.jfif",
        "markstyle": "true",
        "url": "https://vp.fact.qq.com/article?id=60df9d85d6bfa16c628dc3549cded1ff",
        "desc": "最近发表于《自然》杂志的一篇论文对男性患者更易因感染新冠而死亡这个问题进行了解释。其中指出，男性患者在感染新冠初期，体内多种免疫细胞因子的表达水平显著高于女性患者，“细胞因子风暴”导致的肺部组织损伤可能是男性重症患者死亡率更高的原因之一。\n科研人员发现的第二个现象是女性对于新冠病毒可以产生更强的免疫反应，在女性感染者体内，最终T细胞的激活和活性都显著的高于男性患者。在此研究的基础上，针对男女患者对于新冠的不同反应，医护人员可以在治疗时采取更加针对的治疗方法，增强治疗效果。",
        "author": "韩越"
    },
    {
        "id": "96bc42ee0e4e6c96bef3d0df5d42345f",
        "date": "2020-09-09",
        "title": "新冠死者平均只损失了几个月的寿命",
        "explain": "谣言",
        "imgsrc": "images/8q9yQ3Cnw84UQkGiCX8Ez3.png",
        "markstyle": "fake",
        "url": "https://vp.fact.qq.com/article?id=96bc42ee0e4e6c96bef3d0df5d42345f",
        "desc": "认为“只损失数月寿命”的人，是犯了数学上的错误。对在美国业已成功活到78岁的老人来说，其预期寿命并不是78.8岁，而是男性87.8岁，女性89.3岁。也就是说，假如他/她在78岁时因新冠死亡，又没有其它特殊情况，那就会遭受大约10年的寿命损失。",
        "author": "国际谣言查证机构"
    },
    {
        "id": "343da72d4a0f61b5bf14b2bc58f0c968",
        "date": "2020-08-29",
        "title": "人类可能无法对新冠病毒获得持久的免疫保护",
        "explain": "确实如此",
        "imgsrc": "images/mEpZzJ1yAx41ARpFCDwirk.jfif",
        "markstyle": "true",
        "url": "https://vp.fact.qq.com/article?id=343da72d4a0f61b5bf14b2bc58f0c968",
        "desc": "麻疹病毒抗体的半衰期很长，只要感染过或接种过疫苗，人体就能持久地产生抗体，这是获得终身免疫的关键。\n流感病毒抗体半衰期较短，只有半年。而且由于流感病毒的种类太多，基因型容易因病毒株间基因交换而出现重大突变，导致免疫保护完全失效，造成大流感。\n有研究表明新冠病毒抗体的半衰期很短，所以我们不太可能对新冠病毒获得持久的免疫保护。但好在目前其亚型少，也还未发生重大突变，人体内还有细胞免疫反应，也许可以一定程度上抵挡新一轮的病毒感染。",
        "author": "宾夕法尼亚大学医学院病理及实验医药系研究副教授"
    },
    {
        "id": "26269c39baf75de8737ef839f43e0bca",
        "date": "2020-08-28",
        "title": "警犬能够准确闻出感染新冠的人",
        "explain": "尚无定论",
        "imgsrc": "images/mCrHa1h7SeafYjP1Az2s1r.jfif",
        "markstyle": "doubt",
        "url": "https://vp.fact.qq.com/article?id=26269c39baf75de8737ef839f43e0bca",
        "desc": "研究表明，训练后，狗确实可以嗅出来自新冠患者的唾液样本，且准确率还不差。但在机场，检测犬主要是用来找出无症状感染者。如已经有发烧症状，机场使用额温枪或额温检测设备就可以快速进行排查，没必要用检测犬。但是，目前所报道的实验数据里，都没有明确说明检测犬是否能查出来自无症状感染者的样本，它们很有可能无法发现无症状感染者。\n检测犬能检测少量的样本，不能保证对大量样本进行检测的工作。此外，用来这些狗狗同样有感染新冠的风险。所以检测犬上岗的可靠性存疑，狗狗的安全也是需要考虑的因素。",
        "author": "宾夕法尼亚大学医学院病理及实验医药系研究副教授"
    },
    {
        "id": "33c1d15df0f1a82864427b100aa24f0c",
        "date": "2020-08-26",
        "title": "香港新冠“二次感染”病例意味着群体免疫可能无效",
        "explain": "确实如此",
        "imgsrc": "images/vNDDC5EKwNkB8TFM29QTeY.jfif",
        "markstyle": "true",
        "url": "https://vp.fact.qq.com/article?id=33c1d15df0f1a82864427b100aa24f0c",
        "desc": "该香港病例为全球首例康复后二次感染新冠病毒的病例。“二次感染”不是“复阳”，因为该患者第一次和第二次感染的病毒株基因序列并不相同。\n患者为何会二次感染？至少有两种猜测：ADE效应使得患者感染新的病毒株后不能有效抵抗，使病情更加严重。另一原因就是抗体在体内的消失，即患者体内的抗体无法存在很久，导致新的病毒来袭时，患者对它是不设防的。\n该“二次感染”病例提示我们：群体免疫可能是无效的，我们已经无法根除新冠，需要与其长期共存了。其次，疫苗可能无法提供终生保护，我们要通过反复注射来加强免疫，这对疫苗的需求量将更大。虽然当前的“二次感染”病例只是孤例，但这警示新冠康复者也需要保持足够的防疫意识。",
        "author": "中国科学院生物学博士"
    },
    {
        "id": "aa1530d3d81b7eae8289853752d2da59",
        "date": "2020-08-20",
        "title": "印度卫生部长检查基层防疫，不戴口罩者直接扇嘴巴",
        "explain": "谣言",
        "imgsrc": "images/7tJ7zKNSRcPN2SumvWkVwj.jfif",
        "markstyle": "fake",
        "url": "https://vp.fact.qq.com/article?id=aa1530d3d81b7eae8289853752d2da59",
        "desc": "视频中男子手持话筒上街的肢体动作有些夸张，而卫生部长检查基层防疫本应是严肃的事情，视频让人生疑。\n根据央视新闻对印度卫生部长哈什·瓦尔丹（Harsh Vardhan）的图片报道，与网传视频中男子图片比对后，可以肯定视频中的男子并非印度卫生部长。网络辟谣举报平台记者注意到，网传视频原始出处来自YouTube上《24 News HD》2020年7月24日上传的喜剧类节目，拿着话筒男子系巴基斯坦节目的主持人Sajjad Janni。",
        "author": "福建日报社东南网承办"
    },
    {
        "id": "52a7cb98ec05cb2dcd682d8730fdf277",
        "date": "2020-08-19",
        "title": "大数据显示，新冠并没有造成更多人死亡",
        "explain": "谣言",
        "imgsrc": "images/syDkMCEWzApcypBsrhj1nd.png",
        "markstyle": "fake",
        "url": "https://vp.fact.qq.com/article?id=52a7cb98ec05cb2dcd682d8730fdf277",
        "desc": "作者提供的每一个图表或说法，都有离谱的错误或编造的痕迹。实际上，疫情期间美国总死亡人数比正常年份高出了15%以上。\n作者宣称“英国死亡人数无异常”，实际上错误解读了数据。根据英国权威媒体统计，在疫情高峰期，英国的死亡率上升了45%。\n流传文章关于美国这部分，很大程度其实是翻译改写自一篇不靠谱的美国博客文章——除了宣扬错误数据和结论外，还拒绝疫苗。而中文译者在原文的基础上以个人喜好加上了诸多离谱想象。\n作者宣称瑞典在社会运转如常的情况下，取得了理想的防疫成绩。实际上：瑞典是欧洲最后一批走出疫情的国家；瑞典并非不检测、不隔离、不收治；瑞典的新冠死亡率在国情类似的北欧国家中显得非常高。",
        "author": "国际谣言查证机构"
    },
    {
        "id": "4b2de35c66fdcfd36b8bf3183dec6d73",
        "date": "2020-08-18",
        "title": "普京女儿注射疫苗后高烧不治身亡",
        "explain": "谣言",
        "imgsrc": "images/syDkMCEWzApcypBsrhj1nd.png",
        "markstyle": "fake",
        "url": "https://vp.fact.qq.com/article?id=4b2de35c66fdcfd36b8bf3183dec6d73",
        "desc": "俄罗斯Tsargrad电视台网站17日报道称，加拿大媒体“今日多伦多”当日发表了一篇俄罗斯总统普京女儿的所谓“独家新闻”，有关注射新冠疫苗后高烧不治身亡的消息，随后删除了这条假新闻。原文是一篇详细但完全虚假的文章。对于特定读者来说，加拿大网站显然创造了一个骗局。",
        "author": "人民日报海外版官方网站"
    },
    {
        "id": "a15fd960093ece8897fae7c76eeb3699",
        "date": "2020-08-16",
        "title": "新冠病毒会感染中耳组织",
        "explain": "尚无定论",
        "imgsrc": "images/vK7oWDpbJYG7KBsPpzkTYP.jfif",
        "markstyle": "doubt",
        "url": "https://vp.fact.qq.com/article?id=a15fd960093ece8897fae7c76eeb3699",
        "desc": "近日，发表在《美国医学会杂志·耳鼻喉科-头和颈外科学卷》的一项研究中，科研人员从新冠患者尸体的乳突骨及中耳部位检测到了新冠病毒，说明新冠病毒确实可能出现在患者耳部。\n实验中虽然在中耳检测到了新冠病毒，但并不能得出新冠病毒会感染中耳组织的结论。虽然此前也有个别新冠患者出现听力下降症状的报道，但是具体的原因仍不清楚，还需要进行更多的研究。\n耳部出现新冠病毒提示耳鼻喉科医护人员在手术过程中也需要进行额外的防护。不过耳朵并不和外界进行大量气体或物质交换，也不是病毒进行传播的有效途径，所以我们不必过分担心，也无需针对患者的耳部进行格外防护。",
        "author": "韩越"
    }
];
// if (localStorage.getItem("rumorData") != null) {
//     rumorData = JSON.parse(localStorage.getItem("rumorData"));
// }
var randomSize = 0;

// 同程
var traceData = [{
    "id": 4884,
    "date": "2020-04-12",
    "start": "2020/04/12 00:00:00",
    "end": "2020/04/13 00:00:00",
    "type": 1,
    "no": "CA046",
    "memo": "",
    "no_sub": "",
    "pos_start": "马德里",
    "pos_end": "杭州",
    "source": "https://weibo.com/2171757642/IDp4Km78D?refer_flag=1001030103_&type=comment#_rnd1586916380620",
    "who": "浙江新闻频道 ",
    "verified": 1,
    "created_at": "2020/04/15 10:08:56",
    "updated_at": "2020/04/16 18:25:51"
},
{
    "id": 4875,
    "date": "2020-04-11",
    "start": "2020/04/11 00:00:00",
    "end": "2020/04/11 00:00:00",
    "type": 1,
    "no": "CZ0308",
    "memo": "",
    "no_sub": "",
    "pos_start": "阿姆斯特丹",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/W9v_MbolAvgOUOuVq2WRLQ",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/14 16:31:17",
    "updated_at": "2020/04/16 18:27:04"
},
{
    "id": 4878,
    "date": "2020-04-11",
    "start": "2020/04/11 00:00:00",
    "end": "2020/04/11 00:00:00",
    "type": 1,
    "no": "CZ3002",
    "memo": "",
    "no_sub": "",
    "pos_start": "纽约",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/W9v_MbolAvgOUOuVq2WRLQ",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/14 16:39:16",
    "updated_at": "2020/04/16 18:26:46"
},
{
    "id": 4886,
    "date": "2020-04-11",
    "start": "2020/04/11 00:00:00",
    "end": "2020/04/11 00:00:00",
    "type": 1,
    "no": "JD432",
    "memo": "",
    "no_sub": "",
    "pos_start": "伦敦",
    "pos_end": "青岛",
    "source": "https://weibo.com/1784473157/IDHOieoLi?refer_flag=1001030103_&type=comment#_rnd1587087906952",
    "who": "中国新闻网",
    "verified": 1,
    "created_at": "2020/04/17 09:50:34",
    "updated_at": "2020/04/17 15:21:54"
},
{
    "id": 4868,
    "date": "2020-04-10",
    "start": "2020/04/10 00:00:00",
    "end": "2020/04/10 00:00:00",
    "type": 1,
    "no": "SU208",
    "memo": "该航班60位确诊病例",
    "no_sub": "",
    "pos_start": "莫斯科",
    "pos_end": "上海",
    "source": "https://weibo.com/1784473157/ID6z8wYl3?refer_flag=1001030103_&type=comment#_rnd1586746313316",
    "who": "中国新闻网",
    "verified": 1,
    "created_at": "2020/04/13 10:55:59",
    "updated_at": "2020/04/13 16:30:11"
},
{
    "id": 4877,
    "date": "2020-04-10",
    "start": "2020/04/10 00:00:00",
    "end": "2020/04/11 00:00:00",
    "type": 1,
    "no": "CZ0308",
    "memo": "",
    "no_sub": "",
    "pos_start": "阿姆斯特丹",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/W9v_MbolAvgOUOuVq2WRLQ",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/14 16:37:43",
    "updated_at": "2020/04/16 18:26:54"
},
{
    "id": 4881,
    "date": "2020-04-10",
    "start": "2020/04/10 00:00:00",
    "end": "2020/04/11 00:00:00",
    "type": 1,
    "no": "LQ908",
    "memo": "",
    "no_sub": "",
    "pos_start": "柬埔寨金边",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/W9v_MbolAvgOUOuVq2WRLQ",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/14 16:43:25",
    "updated_at": "2020/04/16 18:26:19"
},
{
    "id": 4867,
    "date": "2020-04-08",
    "start": "2020/04/08 00:00:00",
    "end": "2020/04/08 00:00:00",
    "type": 1,
    "no": "K6668",
    "memo": "该航班两名同乘患者",
    "no_sub": "",
    "pos_start": "柬埔寨金边",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/qxtB0aj_3k5eLoNfWT9WwQ",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/13 10:50:19",
    "updated_at": "2020/04/13 16:30:24"
},
{
    "id": 4863,
    "date": "2020-04-08",
    "start": "2020/04/08 00:00:00",
    "end": "2020/04/08 00:00:00",
    "type": 1,
    "no": "CZ0348",
    "memo": "",
    "no_sub": "",
    "pos_start": "巴黎",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/fT7oUl_Twl8sn_cHaFj0Iw",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/13 10:39:46",
    "updated_at": "2020/04/13 16:38:36"
},
{
    "id": 4864,
    "date": "2020-04-07",
    "start": "2020/04/07 00:00:00",
    "end": "2020/04/08 00:00:00",
    "type": 1,
    "no": "CZ348",
    "memo": "",
    "no_sub": "",
    "pos_start": "巴黎",
    "pos_end": "广州",
    "source": "https://mp.weixin.qq.com/s/QapaEh4EZ-t4VsMwtoW7Lg",
    "who": "广东发布",
    "verified": 1,
    "created_at": "2020/04/13 10:42:09",
    "updated_at": "2020/04/13 16:38:16"
}
]
if (localStorage.getItem("traceData") != null) {
    traceData = JSON.parse(localStorage.getItem("traceData"));
}
var tracePageNum = 0
var traceScrollWidth = 550

var navAnimation = [{
    'animation': 'map-after 0.5s ease-in-out',
    'animation-fill-mode': 'forwards'
},
{
    'animation': 'rumor-after 0.5s ease-in-out',
    'animation-fill-mode': 'forwards'
},
{
    'animation': 'trace-after 0.5s ease-in-out',
    'animation-fill-mode': 'forwards'
}
]

// 入口函数
$(document).ready(function () {
    var pageNum = 0;
    var navLeft = $("#navLeft");
    var navRight = $("#navRight");
    var boxMain = $(".box_main");
    var scrollBox = document.getElementById("scroll_box");
    var traceScrollBox = document.getElementById('trace-scroll-box')

    // 
    navRight.fadeOut("300");
    navLeft.fadeOut("300");
    boxMain.mouseenter(function () {
        navRight.fadeIn("300");
        navLeft.fadeIn("300");
    });
    boxMain.mouseleave(function () {
        navRight.fadeOut("300");
        navLeft.fadeOut("300");
    });

    navLeft.click(function () {
        pageNum--;
        if (pageNum < 0) {
            pageNum = 2;
            scrollBox.style.left = `${pageNum * -100}%`
            $("#nav-after").css(navAnimation[pageNum])
            return
        } else if (pageNum == 1) {
            scrollBox.style.left = `${pageNum * -100}%`
            $("#nav-after").css(navAnimation[pageNum])
            return
        }
        $("#nav-after").css(navAnimation[pageNum])
        scrollBox.style.left = `${pageNum * 100}%`
    });
    navRight.click(function () {
        pageNum++;
        if (pageNum > 2) {
            pageNum = 0;
        }
        $("#nav-after").css(navAnimation[pageNum])
        scrollBox.style.left = `${pageNum * -100}%`
    });

    // 同程卡片
    $('#main_3 #trace-box #left-nav').click(function () {
        tracePageNum--;
        let traceScrollBoxLeft = CardMove('left')
        tween(traceScrollBox, {
            left: traceScrollBoxLeft + traceScrollWidth
        }, 10, function () {
            $('#main_3 #trace-box #left-nav').css({
                'display': 'block'
            })
            $('#main_3 #trace-box #right-nav').css({
                'display': 'block'
            })
        });
    })
    $('#main_3 #trace-box #right-nav').click(function () {
        tracePageNum++;
        let traceScrollBoxLeft = CardMove('right')
        tween(traceScrollBox, {
            left: traceScrollBoxLeft - traceScrollWidth
        }, 10, function () {
            $('#main_3 #trace-box #left-nav').css({
                'display': 'block'
            })
            $('#main_3 #trace-box #right-nav').css({
                'display': 'block'
            })
        });
    })

    // 同程卡片移动 函数
    function CardMove(dir) {
        var pageOffset = 1
        $('#main_3 #trace-box #left-nav').css({
            'display': 'none'
        })
        $('#main_3 #trace-box #right-nav').css({
            'display': 'none'
        })
        var scrollBoxLeft = parseInt(getStyle(traceScrollBox, 'left'));
        var scrollBoxChildren = document.querySelectorAll('#trace-scroll-box div');
        [].forEach.call(scrollBoxChildren, item => {
            item.classList.remove('current-box')
            item.classList.remove('side-box')
        })
        if (dir === 'left') {
            pageOffset *= -1
            if (tracePageNum < 0) {
                tracePageNum = 0
                scrollBoxChildren[tracePageNum].classList.add('current-box');
                scrollBoxChildren[tracePageNum + 1].classList.add('side-box');
                $('#main_3 #trace-box #left-nav').css({
                    'display': 'block'
                })
                $('#main_3 #trace-box #right-nav').css({
                    'display': 'block'
                })
                return;
            } else if (tracePageNum > 0) {
                scrollBoxChildren[tracePageNum - 1].classList.add('side-box');
            }
        } else {
            if (tracePageNum > scrollBoxChildren.length - 1) {
                tracePageNum = scrollBoxChildren.length - 1
                scrollBoxChildren[tracePageNum].classList.add('current-box');
                scrollBoxChildren[tracePageNum - 1].classList.add('side-box');
                $('#main_3 #trace-box #left-nav').css({
                    'display': 'block'
                })
                $('#main_3 #trace-box #right-nav').css({
                    'display': 'block'
                })
                return;
            } else if (tracePageNum < scrollBoxChildren.length - 1) {
                scrollBoxChildren[tracePageNum + 1].classList.add('side-box');
            }
        }
        scrollBoxChildren[tracePageNum - pageOffset].classList.add('side-box');
        scrollBoxChildren[tracePageNum].classList.add('current-box');
        return scrollBoxLeft;
    }

    //导航点击
    $("#mapbtn").click(function () {
        pageNum = 0;
        $("#nav-after").css(navAnimation[pageNum])
        scrollBox.style.left = `${pageNum * -100}%`
    });

    $("#rumorbtn").click(function () {
        pageNum = 1;
        $("#nav-after").css(navAnimation[pageNum])
        scrollBox.style.left = `${pageNum * -100}%`
    });

    $("#tracebtn").click(function () {
        pageNum = 2;
        $("#nav-after").css(navAnimation[pageNum])
        scrollBox.style.left = `${pageNum * -100}%`
    });

    // 等封面标题出现后，才触发动画
    setTimeout(function () {
        $("#coverBG").css({
            animation: "coverTween 3s ease-in-out infinite"
        });
    }, 3000);

    // 点击标题，返回封面
    $(".box header h1").click(function () {
        window.location.reload();
    });

    // 是否可以刷新
    var refreshDate = new Date();
    var day = refreshDate.getDate();
    var h = refreshDate.getHours();
    // 刷新日期不是当天，不可以再次刷新
    if (day !== localStorage.getItem("refreshDay")) {
        if (h - localStorage.getItem("refreshHours") >= 2) {
            canRefresh = true;
        } else {
            canRefresh = false;
        }
    }
    // console.log("可以刷新？: " + canRefresh);
    if (canRefresh) {
        // 获取城市疫情数据
        $.get(
            "http://api.tianapi.com/txapi/ncovcity/index?key=c707f6dbaa1b5e751eea380e762b2aa6",
            function (data, status) {
                epidemicData = data;
                gdObj = data.newslist.filter((i) => i.provinceName.includes("广东"));
                gdData = gdObj[0].cities;
                gdData.push(yunFuData);
                gdData.push(dongShaData);
                localStorage.setItem("refreshDay", day);
                localStorage.setItem("refreshHours", h);
                localStorage.setItem("gdData", JSON.stringify(gdData));
            }
        );
        // 获取谣言数据
        /* $.get(
            "http://api.tianapi.com/txapi/rumour/index?key=c707f6dbaa1b5e751eea380e762b2aa6",
            function (data, status) {
                console.log("22222");
                rumorData = data.newslist;
                // localStorage.setItem("rumorData", JSON.stringify(rumorData));
            }
        ); */
        //获取疫情同程
        $.get("http://api.tianapi.com/txapi/ncovsame/index?key=c707f6dbaa1b5e751eea380e762b2aa6",
            function (data, status) {
                traceData = data.newslist
                localStorage.setItem("traceData", JSON.stringify(traceData));
            });
    }

    // 渲染中国地图
    setTimeout(function () {
        chinaMap();
    }, 500);

    // ‘散布’谣言
    randomRumor();

    // 点击关闭柱状图
    $("#close").click(function () {
        $("#bar_box").fadeOut(100);
        $(".china").animate({
            top: 0 + "%",
        },
            300
        );
        clearInterval(bar_timer);
    });

    // 向左点击（或者拖拽）划走封面
    $("#arrow").click(function () {
        $("#coverBG").css({
            'animation': "coverBG 0s ease-in-out"
        });
        $("#coverBG").css({
            left: -100 + "%",
        });
        setTimeout(function () {
            $("#cover").css({
                'display': "none"
            });
            $("#showtime").css({
                'animation': "showtimeTween 1s ease-in-out",
                "animation-fill-mode": "forwards",
            });
            $('header nav').css({
                opacity: "100"
            });
        }, 1000);
    });
    var startX = 0
    var endX = 0
    document.addEventListener("mousedown", function (event) {
        startX = event.clientX;
        startY = event.clientY;
    });
    document.onmouseup = function (event) {
        endX = event.clientX;
        endY = event.clientY;
        if (startX > endX) {
            $("#coverBG").css({
                animation: "coverBG 0s ease-in-out"
            });
            $("#coverBG").css({
                left: -100 + "%",
            });
            setTimeout(function () {
                $("#cover").css({
                    display: "none"
                });
                $("#showtime").css({
                    animation: "showtimeTween 1s ease-in-out",
                    "animation-fill-mode": "forwards",
                });
                $('header nav').css({
                    opacity: "100"
                });
            }, 1000);
        }
        document.removeEventListener("mousedown", this);
        document.removeEventListener("mousemove", this);
    };

    $("body").delegate("#rumorInfo>i", "click", function () {
        let index = $(this).index();
        $("#rumor_dat").html("时间：" + rumorData[index].date);
        $("#rumor_title").html(rumorData[index].title);
        $("#rumor_author").html("作者：" + rumorData[index].author);
        $("#rumor_explain").html("说明：" + rumorData[index].explain);
        // console.log(rumorData[index].imgsrc);

        rumorData[index].imgsrc = rumorData[index].imgsrc.split("?")[0]

        $("#rumor_img").attr("src", rumorData[index].imgsrc);
        $("#rumor_desc").html("描述：" + rumorData[index].desc);
        $("#rumorInfo").fadeOut(300);
        $("#rumor_Det").fadeIn(500);
    });
    //   点击关闭谣言详情
    $("#rumor_close").click(function () {
        $("#rumor_Det").fadeOut(300);
        $("#rumorInfo").fadeIn(500);
    });
});

function saveHandler(data) {
    var content = JSON.stringify(data);
    var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "./json/save.json");
}

// 封装获取【样式】的函数
function getStyle(obj, name) {
    // IE                                      // 主流
    return obj.currentStyle ?
        obj.currentStyle[name] :
        getComputedStyle(obj, false)[name];
}

// 地图
function chinaMap() {
    // 初始化e-charts
    var myChart = echarts.init(document.querySelector(".china"));

    var uploadedDataURL =
        "https://geo.datav.aliyun.com/areas_v2/bound/440000_full.json";
    myChart.showLoading();
    var data = [];
    $.getJSON(uploadedDataURL, function (geoJson) {
        echarts.registerMap("广东", geoJson);
        data = geoJson.features.map((item) => {
            var newData = gdData.filter((i) =>
                item.properties.name.includes(i.cityName)
            );
            var newValue = 0;
            if (newData.length !== 0) {
                newValue = newData[0].currentConfirmedCount;
            }
            return {
                value: "现有确诊：" + newValue,
                name: item.properties.name,
            };
        });
        myChart.hideLoading();
        option = {
            tooltip: {
                backgroundColor: "rgba(0,0,0,0)",
                trigger: "item",
            },
            legend: {
                show: false,
            },
            series: [{
                tooltip: {
                    trigger: "item",
                    formatter: function (item) {
                        var tipHtml = "";
                        tipHtml =
                            '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
                            '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' +
                            item.data.name +
                            "</div>" +
                            '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                            '<span style="font-size:18px;font-weight:bold;">' +
                            item.data.value +
                            " " +
                            "</span>" +
                            "</div>" +
                            "</div>";
                        cityName = item.data.name;
                        return tipHtml;
                    },
                },
                name: "广东省数据",
                type: "map",
                map: "广东", // 自定义扩展图表类型
                aspectScale: 1,
                zoom: 0.8, //缩放
                showLegendSymbol: false,
                label: {
                    show: true,
                    color: "#fff",
                    fontSize: 10,
                },
                // selectedMode: 'single',
                itemStyle: {
                    // 原来0E95F1
                    // #A4C8FD
                    areaColor: "#A4C8FD",
                    // 原来e9e9e9
                    borderColor: "#e9e9e9",
                    borderWidth: 1,
                    // 原来0E95F1
                    shadowColor: "#0E95F1",
                    shadowBlur: 20,
                },
                emphasis: {
                    label: {
                        show: true,
                        color: "#fff",
                        fontSize: 10,
                    },
                    itemStyle: {
                        areaColor: "#FFB769",
                        borderColor: "#fff",
                        borderWidth: 1,
                    },
                },
                layoutCenter: ["50%", "50%"],
                layoutSize: "160%",
                markPoint: {
                    symbol: "none",
                },
                data: data,
            },],
        };
        myChart.setOption(option);
        showTips("广州市");
    });
    // 默认鼠标移出canvas后显示广州的tooltip信息
    myChart.on("globalout", () => {
        setTimeout(() => {
            showTips("广州市");
        }, 5000);
    });

    function showTips(name) {
        data.forEach((item, i) => {
            if (item.name.includes(name)) {
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: i,
                });
                myChart.dispatchAction({
                    type: "mapSelect",
                    seriesIndex: 0,
                    dataIndex: i,
                });
            }
        });
    }

    myChart.on("click", function (params) {
        var city = params.name;
        var cityArr = gdData.filter((i) => city.includes(i.cityName));
        // 把【柱状图】渲染到盒子中，并且【传参】配置数据
        bar(cityArr);
        // 动画部分
        // $(".china").fadeOut(300);
        // $('#bar_box').fadeIn(500);
        $(".china").animate({
            left: -20 + "%",
        },
            350,
            function () {
                $(this).animate({
                    left: 20 + "%",
                },
                    350,
                    function () {
                        $(this).animate({
                            left: 0 + "%",
                        },
                            350,
                            function () {
                                $(this).animate({
                                    top: 200 + "%",
                                },
                                    300,
                                    function () {
                                        $("#bar_box").fadeIn(1000);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
}

// 柱状图
function bar(cityArr) {
    var myChart = echarts.init(document.querySelector(".bar"));
    var option = {
        // backgroundColor:'#323a5e',
        title: {
            text: cityArr[0].cityName,
            textStyle: {
                align: "center",
                color: "#fff",
                fontSize: 20,
            },
            top: "5%",
            left: "center",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: "2%",
            right: "4%",
            bottom: "14%",
            top: "16%",
            containLabel: true,
        },
        legend: {
            data: ["人数"],
            right: 10,
            top: 12,
            textStyle: {
                color: "#fff",
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
        },
        xAxis: {
            type: "category",
            data: ["现有确诊", "累计确诊", "疑似病例", "治愈病例", "死亡病例"],
            axisLine: {
                lineStyle: {
                    color: "white",
                },
            },
            axisLabel: {
                // interval: 0,
                // rotate: 40,
                textStyle: {
                    fontFamily: "Microsoft YaHei",
                },
            },
        },
        yAxis: {
            type: "value",
            max: null,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "white",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,0.3)",
                },
            },
            axisLabel: {},
        },
        //    "dataZoom": [{
        //      "show": true,
        //      "height": 12,
        //      "xAxisIndex": [
        //        0
        //      ],
        //      bottom:'8%',
        //      "start": 10,
        //      "end": 90,
        //      handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //      handleSize: '110%',
        //      handleStyle:{
        //        color:"#d3dee5",

        //      },
        //      textStyle:{
        //        color:"#fff"},
        //      borderColor:"#90979c"
        //    }, {
        //      "type": "inside",
        //      "show": true,
        //      "height": 15,
        //      "start": 1,
        //      "end": 35
        //    }],
        series: [{
            name: "人数",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#248ff7",
                    },
                    {
                        offset: 1,
                        color: "#6851f1",
                    },
                    ]),
                    barBorderRadius: 12,
                },
            },
            data: [
                cityArr[0].currentConfirmedCount,
                cityArr[0].confirmedCount,
                cityArr[0].suspectedCount,
                cityArr[0].curedCount,
                cityArr[0].deadCount,
            ],
        },],
    };
    var app = {
        currentIndex: -1,
    };

    myChart.setOption(option);

    // window.addEventListener("resize", function () {
    //     myChart.resize();
    // });

    // 自动预览柱状图
    tmdBar();

    // 移入，停止自动查看
    myChart.on("mouseover", function () {
        clearInterval(bar_timer);
    });
    // 移出，恢复自动查看
    myChart.on("globalout", function () {
        tmdBar();
    });

    // 自动预览柱状图
    function tmdBar() {
        clearInterval(bar_timer);
        bar_timer = setInterval(function () {
            var dataLen = option.series[0].data.length;

            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: app.currentIndex,
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: app.currentIndex,
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: app.currentIndex,
            });
        }, 2000);
    }
}

// 散布谣言
function randomRumor() {
    // 遍历谣言数据
    rumorData.forEach((item, index) => {
        if (index >= 10) {
            return;
        }
        var rumor_span = document.createElement("span");
        var rumor_i = document.createElement("i");
        rumor_span.innerHTML = item.title; /*+ "    " + posIndex*/
        rumorInfo.appendChild(rumor_i);
        rumor_i.appendChild(rumor_span);

        randomSize = RandomNumBoth(0.9375, 1.875);
        randomX = RandomNumBoth(3.125, 50);
        randomY = RandomNumBoth(3.125, 31.25);
        randomDeg = RandomNumBoth(-30, 30);
        var degStr = randomDeg + "deg";
        rumor_span.style.transform = "rotate(" + degStr + ")";
        rumor_span.style.fontSize = randomSize + "rem";
        posIndex++;
    });
}

function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

//疫情同城查询信息
tracequery();

function tracequery() {
    // 遍历疫情同程信息
    var m = 1;
    traceData.forEach((item, index) => {
        if (index >= 10) {
            return;
        }
        $("#trace-scroll-box div:nth-child(" + m + ") #tracedate").html(item.date);
        $("#trace-scroll-box div:nth-child(" + m + ") #pos_start").html(item.pos_start);
        $("#trace-scroll-box div:nth-child(" + m + ") #pos_end").html(item.pos_end);
        $("#trace-scroll-box div:nth-child(" + m + ") #no").html(item.no);
        $("#trace-scroll-box div:nth-child(" + m + ") #tracestart").html(item.start);
        $("#trace-scroll-box div:nth-child(" + m + ") #traceend").html(item.end);
        $("#trace-scroll-box div:nth-child(" + m + ") #memo").html(item.memo);
        $("#trace-scroll-box div:nth-child(" + m + ") #who").html(item.who);
        $("#trace-scroll-box div:nth-child(" + m + ") #creat_time").html(item.created_at);
        $("#trace-scroll-box div:nth-child(" + m + ") #updated_time").html(item.updated_at);
        m++
    });
}

var t = null;
t = setTimeout(time, 0); //開始运行
function time() {
    clearTimeout(t); //清除定时器
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours(); //获取时
    var m = dt.getMinutes(); //获取分
    var s = dt.getSeconds(); //获取秒
    $("#showtime #p1").html(
        y + " / " + todouble(mt) + " / " + todouble(day) + ""
    );
    $("#showtime #p2").html(todouble(h) + " : " + todouble(m) + " : " + todouble(s));
    t = setTimeout(time, 1000); //设定定时器，循环运行
}

function todouble(a) {
    return a >= 10 ? a : "0" + a;
}