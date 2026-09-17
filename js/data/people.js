/* ==========================================================
   Church History Timeline — Data Layer / People (57)
   Part of the split data layer (see js/data/ for the rest):
   categories.js, people.js, works.js, movements.js, events.js,
   bible-categories.js, bible-books.js. Loaded as plain browser
   globals (no bundler) — order matters only in index.html, not
   between these files, since entities cross-reference each other
   by id string, not by direct object reference.
   ========================================================== */

/* ================================================================
   PEOPLE
   ================================================================ */
const PEOPLE = [
  {
    id: "peter", name: "Simon Peter", birthYear: -1, deathYear: 64,
    image: "",
    publicDescription: "A Galilean fisherman who became a leading figure of the early Christian movement in Jerusalem and, by tradition, in Rome.",
    timelineRole: "Foremost of the Twelve Apostles; traditional first Bishop of Rome.",
    contributions: ["Leadership of the Jerusalem church in its earliest years", "Preaching at Pentecost", "Bridging the gospel to Gentile believers (household of Cornelius)"],
    notableWorks: [], theologicalPositions: ["Apostolic authority", "Jewish-Gentile unity in the church"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["pentecost33", "council_jerusalem48", "martyrdom_peter_paul"],
    sources: ["Acts of the Apostles", "1 & 2 Peter"]
  },
  {
    id: "paul", name: "Paul the Apostle", birthYear: 5, deathYear: 67,
    image: "",
    publicDescription: "A Pharisee and Roman citizen from Tarsus who, after a dramatic conversion, became the most influential missionary and writer of the first-century church.",
    timelineRole: "Apostle to the Gentiles; church planter and theologian.",
    contributions: ["Missionary journeys across Asia Minor, Greece, and Rome", "Theological articulation of justification by faith", "Establishing and correcting churches by letter"],
    notableWorks: [], theologicalPositions: ["Justification by faith", "Unity of Jew and Gentile in Christ", "Grace apart from the Mosaic law"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["council_jerusalem48", "martyrdom_peter_paul"],
    sources: ["Acts of the Apostles", "Pauline epistles"]
  },
  {
    id: "john", name: "John the Apostle", birthYear: 6, deathYear: 100,
    image: "",
    publicDescription: "One of the original Twelve, traditionally credited with the Gospel of John, three epistles, and the Book of Revelation, written while exiled on Patmos.",
    timelineRole: "Last surviving apostle; elder of the church in Ephesus.",
    contributions: ["Authorship of Johannine writings", "Pastoral oversight of the churches of Asia Minor"],
    notableWorks: ["work_revelation"], theologicalPositions: ["Christ as eternal Logos", "Love as the mark of discipleship"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["john_revelation95"],
    sources: ["Gospel of John", "Book of Revelation"]
  },
  {
    id: "ignatius", name: "Ignatius of Antioch", birthYear: 35, deathYear: 108,
    image: "",
    publicDescription: "Third bishop of Antioch, condemned to be thrown to wild beasts in Rome, writing seven influential letters en route to his execution.",
    timelineRole: "Early apostolic father; martyr and defender of church order.",
    contributions: ["Earliest clear articulation of monarchical bishop, presbyters, and deacons", "Coined the phrase 'catholic church'"],
    notableWorks: ["work_ignatius_letters"], theologicalPositions: ["Real presence in the Eucharist", "Unity under the bishop"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["martyrdom_ignatius107"],
    sources: ["Letters of Ignatius"]
  },
  {
    id: "polycarp", name: "Polycarp of Smyrna", birthYear: 69, deathYear: 155,
    image: "",
    publicDescription: "Bishop of Smyrna and disciple of the Apostle John, burned at the stake for refusing to renounce Christ.",
    timelineRole: "Living link between the apostles and the second-century church.",
    contributions: ["Preserved apostolic teaching amid emerging heresies", "His martyrdom account became a model of Christian witness"],
    notableWorks: [], theologicalPositions: ["Fidelity to apostolic tradition"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["martyrdom_polycarp155"],
    sources: ["Martyrdom of Polycarp", "Epistle to the Philippians"]
  },
  {
    id: "justin_martyr", name: "Justin Martyr", birthYear: 100, deathYear: 165,
    image: "",
    publicDescription: "A Gentile philosopher converted to Christianity who became the first great Christian apologist, arguing that Christ fulfilled the truths glimpsed by Greek philosophy.",
    timelineRole: "Pioneer of Christian apologetics in Rome.",
    contributions: ["Defended Christianity before Roman authorities", "Framed Christianity as the true philosophy"],
    notableWorks: ["work_apology_justin"], theologicalPositions: ["Logos theology", "Continuity between reason and revelation"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["justin_apology"],
    sources: ["First Apology", "Dialogue with Trypho"]
  },
  {
    id: "irenaeus", name: "Irenaeus of Lyons", birthYear: 130, deathYear: 202,
    image: "",
    publicDescription: "Bishop of Lyons and student of Polycarp, who wrote the most systematic refutation of Gnosticism produced by the early church.",
    timelineRole: "Chief opponent of Gnostic heresy; architect of the 'rule of faith'.",
    contributions: ["Defined orthodoxy against Gnostic dualism", "Articulated apostolic succession as a guarantee of true teaching"],
    notableWorks: ["work_against_heresies"], theologicalPositions: ["Recapitulation in Christ", "Unity of the Old and New Testament God"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["irenaeus_against_heresies"],
    sources: ["Against Heresies"]
  },
  {
    id: "tertullian", name: "Tertullian", birthYear: 155, deathYear: 220,
    image: "",
    publicDescription: "A North African lawyer and the first major Christian author to write extensively in Latin, coining much of the church's early theological vocabulary.",
    timelineRole: "Father of Latin theology; apologist to Roman officialdom.",
    contributions: ["Coined the Latin term 'trinitas' (Trinity)", "Vigorous defense of Christians against persecution"],
    notableWorks: ["work_tertullian_apologeticus"], theologicalPositions: ["Trinity as one substance, three persons", "Rigorist ethics"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["tertullian_writings"],
    sources: ["Apologeticus", "Against Praxeas"]
  },
  {
    id: "origen", name: "Origen of Alexandria", birthYear: 184, deathYear: 253,
    image: "",
    publicDescription: "A prodigiously learned head of the Alexandrian catechetical school whose speculative theology and biblical scholarship shaped centuries of Christian thought, despite later controversy over some of his views.",
    timelineRole: "Foremost biblical scholar and theologian of the third century.",
    contributions: ["Compiled the Hexapla, a six-column comparative Old Testament", "Pioneered allegorical biblical interpretation", "Trained a generation of Christian scholars"],
    notableWorks: ["work_hexapla"], theologicalPositions: ["Allegorical exegesis", "Subordinationist Christology (later disputed)"],
    associatedMovements: ["mov_apostolic"],
    relatedEvents: ["origen_hexapla", "decian_persecution250"],
    sources: ["Hexapla", "On First Principles"]
  },
  {
    id: "constantine", name: "Constantine the Great", birthYear: 272, deathYear: 337,
    image: "",
    publicDescription: "Roman emperor who ended imperial persecution of Christians, convened the Council of Nicaea, and moved the empire's capital to Constantinople.",
    timelineRole: "First Christian Roman emperor; convener of the first ecumenical council.",
    contributions: ["Issued the Edict of Milan legalizing Christianity", "Convened and presided over the Council of Nicaea", "Sponsored church building across the empire"],
    notableWorks: [], theologicalPositions: ["Imperial patronage of Nicene orthodoxy"],
    associatedMovements: ["mov_nicene"],
    relatedEvents: ["constantine_conversion312", "edict_milan313", "council_nicaea325"],
    sources: ["Eusebius, Life of Constantine"]
  },
  {
    id: "athanasius", name: "Athanasius of Alexandria", birthYear: 296, deathYear: 373,
    image: "",
    publicDescription: "A relentless defender of Nicene orthodoxy who was exiled five times for his opposition to Arianism, earning the epithet 'Athanasius contra mundum' (against the world).",
    timelineRole: "Chief theological architect and defender of the Nicene Creed.",
    contributions: ["Defended the full deity of Christ against Arianism for four decades", "Shaped the final canon of the New Testament in his Easter letter of 367"],
    notableWorks: ["work_on_incarnation"], theologicalPositions: ["Homoousios — the Son is of the same substance as the Father"],
    associatedMovements: ["mov_nicene"],
    relatedEvents: ["council_nicaea325", "arian_controversy"],
    sources: ["On the Incarnation", "Letters to Serapion"]
  },
  {
    id: "arius", name: "Arius", birthYear: 256, deathYear: 336,
    image: "",
    publicDescription: "An Alexandrian presbyter whose teaching that the Son was a created being, not eternally divine, provoked the controversy that led to the Council of Nicaea.",
    timelineRole: "Central figure of the Arian controversy.",
    contributions: ["Forced the church to define the relationship of the Son to the Father"],
    notableWorks: [], theologicalPositions: ["The Son is a created being, not co-eternal with the Father"],
    associatedMovements: [],
    relatedEvents: ["council_nicaea325", "arian_controversy"],
    sources: ["Fragments preserved by opponents"]
  },
  {
    id: "eusebius", name: "Eusebius of Caesarea", birthYear: 260, deathYear: 339,
    image: "",
    publicDescription: "Bishop of Caesarea and confidant of Constantine, remembered as the 'Father of Church History' for his pioneering historical chronicle of Christianity's first three centuries.",
    timelineRole: "Church historian and biographer of Constantine.",
    contributions: ["Wrote the Ecclesiastical History, the primary narrative source for the early church"],
    notableWorks: ["work_ecclesiastical_history"], theologicalPositions: ["Moderate, initially sympathetic to Arian language"],
    associatedMovements: ["mov_nicene"],
    relatedEvents: ["council_nicaea325"],
    sources: ["Ecclesiastical History"]
  },
  {
    id: "basil_great", name: "Basil of Caesarea", birthYear: 330, deathYear: 379,
    image: "",
    publicDescription: "Bishop of Caesarea in Cappadocia, organizer of monastic rules and a key defender of Nicene theology against Arianism in the East.",
    timelineRole: "Leading figure of the Cappadocian Fathers.",
    contributions: ["Wrote a monastic rule still influential in Eastern monasticism", "Defended the divinity of the Holy Spirit"],
    notableWorks: ["work_on_holy_spirit"], theologicalPositions: ["Full divinity of the Holy Spirit", "Trinity as one ousia, three hypostases"],
    associatedMovements: ["mov_nicene", "mov_monasticism"],
    relatedEvents: ["council_constantinople381"],
    sources: ["On the Holy Spirit", "Hexaemeron"]
  },
  {
    id: "gregory_nazianzus", name: "Gregory of Nazianzus", birthYear: 329, deathYear: 390,
    image: "",
    publicDescription: "A gifted orator and briefly Archbishop of Constantinople, remembered as 'the Theologian' for his precise articulation of Trinitarian doctrine.",
    timelineRole: "Cappadocian Father; president of the Council of Constantinople.",
    contributions: ["Delivered the Five Theological Orations", "Presided over part of the Council of Constantinople (381)"],
    notableWorks: ["work_theological_orations"], theologicalPositions: ["Full and equal divinity of Father, Son, and Spirit"],
    associatedMovements: ["mov_nicene"],
    relatedEvents: ["council_constantinople381"],
    sources: ["Five Theological Orations"]
  },
  {
    id: "gregory_nyssa", name: "Gregory of Nyssa", birthYear: 335, deathYear: 395,
    image: "",
    publicDescription: "Younger brother of Basil the Great and one of the most philosophically sophisticated theologians of the Nicene settlement.",
    timelineRole: "Cappadocian Father and mystical theologian.",
    contributions: ["Refined Trinitarian and christological vocabulary", "Developed apophatic (negative) theology"],
    notableWorks: [], theologicalPositions: ["Divine infinity", "Trinitarian unity of will and nature"],
    associatedMovements: ["mov_nicene"],
    relatedEvents: ["council_constantinople381"],
    sources: ["The Life of Moses", "Catechetical Oration"]
  },
  {
    id: "john_chrysostom", name: "John Chrysostom", birthYear: 347, deathYear: 407,
    image: "",
    publicDescription: "Archbishop of Constantinople famed for his eloquent preaching — 'Chrysostom' means 'golden-mouthed' — and for his outspoken social criticism, which led to his exile.",
    timelineRole: "Preacher and reforming Archbishop of Constantinople.",
    contributions: ["Left an enormous body of expository homilies", "Confronted imperial and ecclesiastical corruption"],
    notableWorks: ["work_chrysostom_homilies"], theologicalPositions: ["Literal-historical exegesis (Antiochene school)", "Care for the poor as gospel imperative"],
    associatedMovements: [],
    relatedEvents: [],
    sources: ["Homilies on the New Testament"]
  },
  {
    id: "jerome", name: "Jerome", birthYear: 347, deathYear: 420,
    image: "",
    publicDescription: "An ascetic scholar who translated the Bible into Latin from the original Hebrew and Greek, producing the Vulgate that would remain the standard Western text for a millennium.",
    timelineRole: "Translator of the Vulgate; biblical scholar.",
    contributions: ["Translated the entire Bible into Latin", "Wrote commentaries and a catalog of Christian authors"],
    notableWorks: ["work_vulgate"], theologicalPositions: ["Textual fidelity to Hebrew and Greek originals", "Ascetic monasticism"],
    associatedMovements: ["mov_monasticism"],
    relatedEvents: ["vulgate_translation"],
    sources: ["Vulgate preface letters"]
  },
  {
    id: "augustine", name: "Augustine of Hippo", birthYear: 354, deathYear: 430,
    image: "",
    publicDescription: "A North African rhetorician whose dramatic conversion from Manichaeism led him to become the most influential theologian of the Latin church, shaping Western views of sin, grace, and the church for over a thousand years.",
    timelineRole: "Bishop of Hippo; foundational theologian of Western Christianity.",
    contributions: ["Formulated the doctrine of original sin and grace", "Defended the church against Donatism and Pelagianism", "Wrote the first great work of Western autobiography"],
    notableWorks: ["work_confessions", "work_city_of_god", "work_on_christian_doctrine", "work_enchiridion"], theologicalPositions: ["Original sin", "Predestination and irresistible grace", "Just war theory", "Two Cities (City of God vs. City of Man)"],
    associatedMovements: [],
    relatedEvents: ["augustine_confessions", "augustine_city_of_god"],
    sources: ["Confessions", "City of God", "On the Trinity"]
  },
  {
    id: "cyril_alexandria", name: "Cyril of Alexandria", birthYear: 376, deathYear: 444,
    image: "",
    publicDescription: "Patriarch of Alexandria whose forceful opposition to Nestorius at the Council of Ephesus secured the title 'Theotokos' (God-bearer) for Mary and shaped classical Christology.",
    timelineRole: "Chief theological opponent of Nestorianism.",
    contributions: ["Led the Council of Ephesus against Nestorius", "Clarified the hypostatic union of Christ's two natures"],
    notableWorks: [], theologicalPositions: ["Hypostatic union", "Mary as Theotokos"],
    associatedMovements: [],
    relatedEvents: ["council_ephesus431"],
    sources: ["Letters to Nestorius"]
  },
  {
    id: "leo_great", name: "Pope Leo I (the Great)", birthYear: 400, deathYear: 461,
    image: "",
    publicDescription: "Bishop of Rome whose 'Tome' decisively shaped the Christology adopted at Chalcedon, and who is said to have persuaded Attila the Hun to withdraw from Italy.",
    timelineRole: "Pope during the Council of Chalcedon; architect of Chalcedonian Christology.",
    contributions: ["Authored the Tome of Leo, the basis for the Chalcedonian Definition", "Strengthened the authority of the Roman see"],
    notableWorks: ["work_tome_of_leo"], theologicalPositions: ["Christ in two natures, fully God and fully man, united in one person"],
    associatedMovements: [],
    relatedEvents: ["council_chalcedon451", "chalcedonian_schism"],
    sources: ["Tome of Leo"]
  },
  {
    id: "benedict_nursia", name: "Benedict of Nursia", birthYear: 480, deathYear: 547,
    image: "",
    publicDescription: "An Italian monk whose balanced, moderate monastic rule became the foundation of Western monasticism for over a thousand years.",
    timelineRole: "Father of Western monasticism.",
    contributions: ["Wrote the Rule of St. Benedict", "Founded the monastery of Monte Cassino"],
    notableWorks: ["work_rule_benedict"], theologicalPositions: ["Ora et labora — prayer and work as the monastic vocation"],
    associatedMovements: ["mov_monasticism"],
    relatedEvents: ["benedict_rule", "monasticism_spread"],
    sources: ["Rule of St. Benedict"]
  },
  {
    id: "gregory_great", name: "Pope Gregory I (the Great)", birthYear: 540, deathYear: 604,
    image: "",
    publicDescription: "A former Roman prefect turned monk who, as pope, reorganized church administration, sent missionaries to England, and helped define the medieval papacy.",
    timelineRole: "Pope who expanded papal authority and missionary reach.",
    contributions: ["Sent Augustine of Canterbury to evangelize England", "Reformed liturgy and church administration", "Wrote influential pastoral and moral works"],
    notableWorks: [], theologicalPositions: ["Pastoral care as central to church leadership"],
    associatedMovements: [],
    relatedEvents: ["gregory_great_papacy"],
    sources: ["Pastoral Rule", "Dialogues"]
  },
  {
    id: "john_damascus", name: "John of Damascus", birthYear: 675, deathYear: 749,
    image: "",
    publicDescription: "A Christian official in the Umayyad court turned monk, whose systematic theology and defense of icons made him the last great theologian of the Greek patristic era.",
    timelineRole: "Systematizer of Eastern theology; defender of icon veneration.",
    contributions: ["Wrote the first systematic summary of Christian doctrine", "Defended the veneration of icons during Byzantine Iconoclasm"],
    notableWorks: ["work_orthodox_faith"], theologicalPositions: ["Icons as legitimate veneration of the incarnate Christ"],
    associatedMovements: ["mov_eastern_orthodoxy"],
    relatedEvents: ["iconoclast_controversy", "john_damascus_orthodox_faith"],
    sources: ["On the Orthodox Faith"]
  },
  {
    id: "charlemagne", name: "Charlemagne", birthYear: 742, deathYear: 814,
    image: "",
    publicDescription: "King of the Franks crowned Holy Roman Emperor by Pope Leo III, whose reign fused Frankish political power with Latin Christianity and sparked a revival of learning.",
    timelineRole: "Emperor who bound Western church and state together.",
    contributions: ["Sponsored the Carolingian Renaissance of learning", "Expanded Latin Christendom through conquest and mission"],
    notableWorks: [], theologicalPositions: ["State sponsorship and protection of the church"],
    associatedMovements: [],
    relatedEvents: ["charlemagne_crowned"],
    sources: ["Einhard, Life of Charlemagne"]
  },
  {
    id: "photius", name: "Photius I of Constantinople", birthYear: 810, deathYear: 893,
    image: "",
    publicDescription: "A learned Byzantine patriarch whose disputes with Rome over papal authority and the Filioque clause foreshadowed the Great Schism.",
    timelineRole: "Patriarch of Constantinople; early critic of Roman primacy claims.",
    contributions: ["Formally objected to the Filioque addition to the Nicene Creed", "Clashed with Rome over jurisdiction, prefiguring 1054"],
    notableWorks: [], theologicalPositions: ["Rejection of the Filioque", "Conciliar rather than papal authority"],
    associatedMovements: ["mov_eastern_orthodoxy"],
    relatedEvents: ["filioque_controversy"],
    sources: ["Mystagogy of the Holy Spirit"]
  },
  {
    id: "anselm", name: "Anselm of Canterbury", birthYear: 1033, deathYear: 1109,
    image: "",
    publicDescription: "An Italian-born Benedictine who became Archbishop of Canterbury and is regarded as the father of scholasticism for his rigorous, reasoned approach to theology.",
    timelineRole: "Archbishop of Canterbury; founding figure of scholastic theology.",
    contributions: ["Formulated the ontological argument for God's existence", "Developed the satisfaction theory of the atonement"],
    notableWorks: ["work_cur_deus_homo"], theologicalPositions: ["Faith seeking understanding", "Satisfaction theory of atonement"],
    associatedMovements: ["mov_scholasticism"],
    relatedEvents: ["anselm_cur_deus_homo"],
    sources: ["Cur Deus Homo", "Proslogion"]
  },
  {
    id: "bernard_clairvaux", name: "Bernard of Clairvaux", birthYear: 1090, deathYear: 1153,
    image: "",
    publicDescription: "A charismatic Cistercian abbot whose preaching and letters made him the most influential churchman of twelfth-century Europe.",
    timelineRole: "Leading voice of the Cistercian reform of monasticism.",
    contributions: ["Expanded the Cistercian order across Europe", "Preached in support of the Second Crusade", "Wrote influential mystical and devotional works"],
    notableWorks: [], theologicalPositions: ["Mystical union with Christ", "Monastic reform toward simplicity"],
    associatedMovements: ["mov_monasticism"],
    relatedEvents: ["cistercian_reform"],
    sources: ["On Loving God", "Sermons on the Song of Songs"]
  },
  {
    id: "francis_assisi", name: "Francis of Assisi", birthYear: 1181, deathYear: 1226,
    image: "",
    publicDescription: "A wealthy merchant's son who renounced material possessions to live in radical poverty, founding an order devoted to preaching, poverty, and care for creation.",
    timelineRole: "Founder of the Franciscan Order.",
    contributions: ["Founded the Order of Friars Minor (Franciscans)", "Modeled radical poverty and itinerant preaching"],
    notableWorks: [], theologicalPositions: ["Apostolic poverty", "Kinship with all creation"],
    associatedMovements: ["mov_franciscan"],
    relatedEvents: ["francis_founds_order"],
    sources: ["Canticle of the Sun"]
  },
  {
    id: "aquinas", name: "Thomas Aquinas", birthYear: 1225, deathYear: 1274,
    image: "",
    publicDescription: "A Dominican friar and the towering intellect of medieval scholasticism, who synthesized Aristotelian philosophy with Christian theology in an enormous systematic work.",
    timelineRole: "Preeminent scholastic theologian and philosopher.",
    contributions: ["Wrote the Summa Theologica, a comprehensive theological synthesis", "Integrated Aristotelian logic and metaphysics with Christian doctrine"],
    notableWorks: ["work_summa_theologica"], theologicalPositions: ["Natural theology and the five ways", "Reason and revelation as complementary"],
    associatedMovements: ["mov_scholasticism"],
    relatedEvents: ["aquinas_summa"],
    sources: ["Summa Theologica", "Summa Contra Gentiles"]
  },
  {
    id: "wycliffe", name: "John Wycliffe", birthYear: 1330, deathYear: 1384,
    image: "",
    publicDescription: "An Oxford theologian who challenged papal authority and church wealth, and sponsored the first full translation of the Bible into English.",
    timelineRole: "Oxford reformer; 'Morning Star of the Reformation'.",
    contributions: ["Sponsored the first English Bible translation", "Challenged transubstantiation and papal authority", "Inspired the Lollard movement"],
    notableWorks: ["work_wycliffe_bible"], theologicalPositions: ["Scripture as the sole authority for doctrine", "Rejection of transubstantiation"],
    associatedMovements: [],
    relatedEvents: ["wycliffe_bible"],
    sources: ["On the Truth of Holy Scripture"]
  },
  {
    id: "hus", name: "Jan Hus", birthYear: 1369, deathYear: 1415,
    image: "",
    publicDescription: "A Czech priest and reformer influenced by Wycliffe, burned at the stake for heresy after being promised safe conduct to the Council of Constance.",
    timelineRole: "Bohemian reformer and martyr; forerunner of the Reformation.",
    contributions: ["Preached reform and scriptural authority in Prague", "His execution ignited the Hussite Wars"],
    notableWorks: [], theologicalPositions: ["Church authority subordinate to Scripture", "Criticism of clerical corruption"],
    associatedMovements: [],
    relatedEvents: ["council_constance1414", "hus_martyrdom"],
    sources: ["De Ecclesia"]
  },
  {
    id: "luther", name: "Martin Luther", birthYear: 1483, deathYear: 1546,
    image: "",
    publicDescription: "A German Augustinian monk and professor whose challenge to indulgence sales ignited the Protestant Reformation and reshaped the map of European Christianity.",
    timelineRole: "Chief instigator of the Protestant Reformation.",
    contributions: ["Posted the Ninety-Five Theses", "Translated the Bible into German", "Articulated justification by faith alone"],
    notableWorks: ["work_95_theses", "work_bondage_of_will", "work_freedom_of_christian", "work_luther_small_catechism"], theologicalPositions: ["Justification by faith alone (sola fide)", "Scripture alone (sola scriptura)", "Priesthood of all believers"],
    associatedMovements: ["mov_protestant_reformation"],
    relatedEvents: ["luther_95_theses", "luther_diet_worms", "augsburg_confession"],
    sources: ["Ninety-Five Theses", "The Bondage of the Will"]
  },
  {
    id: "zwingli", name: "Huldrych Zwingli", birthYear: 1484, deathYear: 1531,
    image: "",
    publicDescription: "A Swiss priest and humanist scholar who led an independent reformation in Zurich, differing from Luther chiefly over the Lord's Supper.",
    timelineRole: "Leader of the Swiss Reformation in Zurich; founder of the Reformed (as distinct from Lutheran) branch of Protestantism.",
    contributions: ["Reformed worship and church governance in Zurich", "Argued for a symbolic (memorial) view of the Eucharist", "Established the theological starting point from which Bullinger and Calvin built the wider Reformed tradition"],
    notableWorks: [], theologicalPositions: ["Symbolic view of the Lord's Supper", "Scripture as sole rule of faith", "Church reform through the civil magistrate"],
    associatedMovements: ["mov_protestant_reformation", "mov_calvinism"],
    relatedEvents: ["zwingli_zurich_reform"],
    sources: ["Sixty-Seven Articles"],
    fullBiography: [
      "Huldrych Zwingli was born in 1484 in the Swiss Toggenburg valley and, unlike Luther, arrived at reform through Renaissance humanism as much as monastic anguish. Educated at Vienna and Basel and influenced by Erasmus, he was appointed people's priest at the Grossmünster in Zurich in 1519, where he began preaching verse-by-verse through the New Testament in the original Greek rather than following the church's prescribed lectionary — a quietly radical act that placed the text of Scripture, not ecclesiastical custom, at the center of the pulpit.",
      "Zwingli's reform proceeded through public disputations rather than a single dramatic act like Luther's theses. In the First and Second Zurich Disputations of 1523, he defended sixty-seven articles before the city council, which then formally adopted reform: images were removed from churches, the Mass was replaced with a simplified communion service, and clerical celibacy was abolished. Because Zurich's council enacted these changes directly, Zwingli's reform fused civic and ecclesiastical authority in a way that became a template for Reformed cities across Switzerland and, later, the Netherlands and Scotland.",
      "His decisive and lasting break from Luther came over the Lord's Supper. At the Marburg Colloquy of 1529, convened to unite the German and Swiss reformations against a common Catholic front, Zwingli insisted Christ's words 'this is my body' were figurative, while Luther insisted on a real, if mysterious, bodily presence. The two parties reached agreement on fourteen of fifteen articles but split irreconcilably on the fifteenth, permanently dividing Protestantism into Lutheran and Reformed branches. Zwingli was killed in 1531 at the Battle of Kappel, fighting alongside Zurich's forces against Catholic cantons, but his fusion of biblical preaching, disputation, and civic reform passed to his successor Heinrich Bullinger and, through Bullinger and Calvin, became the foundation of the entire Reformed and Presbyterian tradition."
    ]
  },
  {
    id: "calvin", name: "John Calvin", birthYear: 1509, deathYear: 1564,
    image: "",
    publicDescription: "A French lawyer turned reformer who built a highly organized reform movement in Geneva and wrote the most systematic theological work of the Reformation.",
    timelineRole: "Architect of Reformed theology; reformer of Geneva; the single most influential figure in the Reformed tradition.",
    contributions: ["Wrote the Institutes of the Christian Religion", "Established Geneva as a model Reformed city and the training ground for Reformed pastors sent across Europe", "Organized the Genevan Consistory, fusing pastoral discipline with civic life", "Corresponded with and shaped reformers across France, Scotland, England, and the Netherlands"],
    notableWorks: ["work_institutes", "work_calvin_romans_commentary"], theologicalPositions: ["Sovereignty of God", "Predestination (unconditional election)", "Covenant theology", "Presbyterian/conciliar church government", "The 'third use' of the law as a guide for the Christian life"],
    associatedMovements: ["mov_calvinism", "mov_protestant_reformation", "mov_reformed_scholasticism"],
    relatedEvents: ["calvin_institutes", "calvin_geneva_ministry"],
    sources: ["Institutes of the Christian Religion"],
    fullBiography: [
      "John Calvin was born in Noyon, France, in 1509 and trained first in law before a 'sudden conversion' (as he later described it) turned him toward reform around 1533. Forced to flee France amid a crackdown on Protestant sympathizers, he settled briefly in Basel, where in 1536, at just twenty-six, he published the first edition of the Institutes of the Christian Religion — intended as a concise defense of the persecuted French Protestants but destined to become the most influential systematic theology the Reformation produced.",
      "Passing through Geneva later that year, Calvin was persuaded — famously, under threat of what he took as a curse — by the fiery reformer William Farel to stay and help reform the city. Early efforts to impose strict church discipline provoked a backlash that got both men expelled in 1538, but Geneva recalled Calvin in 1541, and this second phase of his ministry proved lasting. He drafted the Ecclesiastical Ordinances establishing four church offices (pastors, teachers, elders, and deacons) and a Consistory of pastors and lay elders that oversaw both doctrine and moral life, a model of church governance that would travel with Reformed emigres to France, the Netherlands, Scotland, and eventually North America as Presbyterian polity.",
      "Geneva under Calvin became, in John Knox's admiring words, 'the most perfect school of Christ since the days of the apostles.' The city hosted refugee reformers from across Europe, trained pastors at the Geneva Academy (founded 1559), and became a printing and publishing center that distributed Reformed literature internationally. Calvin continued expanding the Institutes through five editions until 1559, transforming it from a short apologetic pamphlet into a massive, closely argued systematic theology organized around the knowledge of God the Creator and God the Redeemer. He died in Geneva in 1564, but the movement bearing his name — Calvinism — had already outgrown any single city, becoming the theological backbone of Reformed churches, Huguenot congregations, Dutch Reformed churches, Scottish Presbyterianism, and English and American Puritanism."
    ]
  },
  {
    id: "knox", name: "John Knox", birthYear: 1514, deathYear: 1572,
    image: "",
    publicDescription: "A Scottish reformer trained under Calvin in Geneva who led the Reformation in Scotland and founded the Presbyterian tradition.",
    timelineRole: "Founder of Scottish Presbyterianism; chief architect of the Reformed Church of Scotland.",
    contributions: ["Led the Scottish Reformation", "Helped draft the Scots Confession and the First Book of Discipline", "Modeled Genevan church governance for the Church of Scotland", "Wrote extensively against the religious authority of Mary, Queen of Scots"],
    notableWorks: ["work_scots_confession"], theologicalPositions: ["Presbyterian church governance", "Calvinist Reformed theology", "Resistance to ungodly civil rulers under certain conditions"],
    associatedMovements: ["mov_calvinism", "mov_presbyterianism"],
    relatedEvents: ["scots_confession_1560"],
    sources: ["History of the Reformation in Scotland"],
    fullBiography: [
      "John Knox began as a Catholic priest and notary in Scotland before embracing reform in the 1540s under the influence of the Scottish martyr George Wishart. Captured by French forces after a brief spell as a Protestant galley slave, he eventually made his way to England and then, fleeing the Catholic restoration under Mary Tudor, to Geneva, where he came under Calvin's direct influence and pastored a congregation of English exiles.",
      "Knox returned to a Scotland in religious and political ferment in 1559, and his preaching helped catalyze the Scottish Reformation Parliament of 1560, which abolished papal jurisdiction and adopted the Scots Confession that Knox and five colleagues had drafted in a matter of days. He then led the drafting of the First Book of Discipline, which proposed a national system of parish churches governed not by bishops but by graduated courts of ministers and elders — the presbyterian polity that would come to define Scottish, and later much of global Reformed, church government.",
      "Knox's remaining years were consumed by conflict with Mary, Queen of Scots, whose Catholic faith and claim to rule he regarded as incompatible with a godly commonwealth; his tract 'The First Blast of the Trumpet Against the Monstrous Regiment of Women' argued against female rule in terms that damaged his later standing even among fellow reformers, including Calvin. Yet the institutional legacy he left proved durable far beyond his lifetime: the Presbyterian Church of Scotland he helped found became the template that Scots-Irish and English Puritan emigrants carried to Ulster and to colonial America, making Knox, alongside Calvin, one of the two figures most responsible for Presbyterianism as a worldwide tradition."
    ]
  },
  {
    id: "loyola", name: "Ignatius of Loyola", birthYear: 1491, deathYear: 1556,
    image: "",
    publicDescription: "A Spanish soldier whose battlefield injury led to a spiritual conversion; he founded the Society of Jesus to serve as an intellectually rigorous, mobile arm of Catholic renewal.",
    timelineRole: "Founder of the Jesuits; leader of the Counter-Reformation.",
    contributions: ["Founded the Society of Jesus (Jesuits)", "Wrote the Spiritual Exercises", "Advanced Catholic education and missions worldwide"],
    notableWorks: ["work_spiritual_exercises"], theologicalPositions: ["Obedience to the papacy", "Disciplined spiritual formation"],
    associatedMovements: ["mov_counter_reformation"],
    relatedEvents: ["jesuits_founded"],
    sources: ["Spiritual Exercises"]
  },
  {
    id: "teresa_avila", name: "Teresa of Ávila", birthYear: 1515, deathYear: 1582,
    image: "",
    publicDescription: "A Spanish Carmelite nun and mystic who reformed her order toward stricter contemplative life and wrote enduring classics of Christian spirituality.",
    timelineRole: "Mystic and reformer of the Carmelite order.",
    contributions: ["Reformed the Carmelites (Discalced Carmelites)", "Wrote foundational works of Christian mysticism"],
    notableWorks: [], theologicalPositions: ["Contemplative prayer", "Interior spiritual ascent"],
    associatedMovements: ["mov_counter_reformation"],
    relatedEvents: [],
    sources: ["The Interior Castle", "The Way of Perfection"]
  },
  {
    id: "melanchthon", name: "Philip Melanchthon", birthYear: 1497, deathYear: 1560,
    image: "",
    publicDescription: "Luther's closest collaborator and a humanist scholar who gave the Lutheran Reformation its systematic theological and educational structure.",
    timelineRole: "Chief theologian and diplomat of the Lutheran Reformation.",
    contributions: ["Authored the Augsburg Confession", "Reformed German university education"],
    notableWorks: ["work_augsburg_confession"], theologicalPositions: ["Lutheran doctrine of justification", "Irenic approach to church unity"],
    associatedMovements: ["mov_protestant_reformation"],
    relatedEvents: ["augsburg_confession"],
    sources: ["Augsburg Confession", "Loci Communes"]
  },
  {
    id: "bunyan", name: "John Bunyan", birthYear: 1628, deathYear: 1688,
    image: "",
    publicDescription: "An English tinker turned Puritan preacher who, while imprisoned for unlicensed preaching, wrote one of the most widely read allegories in the English language.",
    timelineRole: "Puritan preacher and author.",
    contributions: ["Wrote The Pilgrim's Progress during imprisonment", "Modeled nonconformist preaching under persecution"],
    notableWorks: ["work_pilgrims_progress"], theologicalPositions: ["Puritan Reformed theology", "The Christian life as spiritual pilgrimage"],
    associatedMovements: [],
    relatedEvents: [],
    sources: ["The Pilgrim's Progress", "Grace Abounding"]
  },
  {
    id: "wesley_john", name: "John Wesley", birthYear: 1703, deathYear: 1791,
    image: "",
    publicDescription: "An Anglican priest whose 'heart strangely warmed' conversion experience launched a preaching movement emphasizing personal holiness, which grew into Methodism.",
    timelineRole: "Founder of the Methodist movement.",
    contributions: ["Preached tirelessly across Britain, often outdoors", "Organized converts into disciplined 'societies' and 'classes'", "Championed prison reform and abolition"],
    notableWorks: [], theologicalPositions: ["Arminian theology", "Entire sanctification / Christian perfection"],
    associatedMovements: ["mov_methodism"],
    relatedEvents: ["wesley_aldersgate"],
    sources: ["Wesley's Journal", "Sermons"]
  },
  {
    id: "edwards_jonathan", name: "Jonathan Edwards", birthYear: 1703, deathYear: 1758,
    image: "",
    publicDescription: "A Puritan pastor and philosopher-theologian in colonial New England whose preaching helped spark the First Great Awakening.",
    timelineRole: "Leading theologian and preacher of the First Great Awakening.",
    contributions: ["Preached revivalist sermons that spread through the colonies", "Wrote influential works on religious affections and free will"],
    notableWorks: ["work_sinners_hands"], theologicalPositions: ["Reformed Calvinism", "Religious affections as evidence of true conversion"],
    associatedMovements: ["mov_great_awakening"],
    relatedEvents: ["great_awakening_first", "edwards_sinners_hands"],
    sources: ["Sinners in the Hands of an Angry God", "Religious Affections"]
  },
  {
    id: "spurgeon", name: "Charles Spurgeon", birthYear: 1834, deathYear: 1892,
    image: "",
    publicDescription: "A Baptist pastor in London known as the 'Prince of Preachers,' whose sermons drew thousands weekly and remain among the most widely distributed in history.",
    timelineRole: "Prominent Victorian-era Baptist preacher.",
    contributions: ["Pastored the Metropolitan Tabernacle to enormous congregations", "Founded a pastors' college and charitable institutions"],
    notableWorks: [], theologicalPositions: ["Reformed Baptist theology", "Expository preaching"],
    associatedMovements: [],
    relatedEvents: [],
    sources: ["The Treasury of David", "Lectures to My Students"]
  },
  {
    id: "seymour_william", name: "William J. Seymour", birthYear: 1870, deathYear: 1922,
    image: "",
    publicDescription: "An African American holiness preacher whose Los Angeles revival at a former livery stable on Azusa Street sparked the global Pentecostal movement.",
    timelineRole: "Central leader of the Azusa Street Revival.",
    contributions: ["Led the Azusa Street Revival (1906-1915)", "Modeled racially integrated worship, unusual for the era"],
    notableWorks: [], theologicalPositions: ["Baptism in the Holy Spirit evidenced by speaking in tongues"],
    associatedMovements: ["mov_pentecostalism"],
    relatedEvents: ["azusa_street_revival"],
    sources: ["The Apostolic Faith (periodical)"]
  },
  {
    id: "bonhoeffer", name: "Dietrich Bonhoeffer", birthYear: 1906, deathYear: 1945,
    image: "",
    publicDescription: "A German Lutheran pastor and theologian who resisted Nazism through the Confessing Church and was executed for his part in a plot against Hitler.",
    timelineRole: "Theologian-martyr of the Confessing Church.",
    contributions: ["Helped lead the Confessing Church's resistance to Nazi ideology", "Wrote enduring works on discipleship and Christian ethics", "Participated in resistance efforts against Hitler"],
    notableWorks: ["work_cost_of_discipleship"], theologicalPositions: ["Costly grace versus cheap grace", "The church's obligation to resist state evil"],
    associatedMovements: [],
    relatedEvents: ["bonhoeffer_martyrdom"],
    sources: ["The Cost of Discipleship", "Letters and Papers from Prison"]
  },
  {
    id: "billy_graham", name: "Billy Graham", birthYear: 1918, deathYear: 2018,
    image: "",
    publicDescription: "An American evangelist whose decades of stadium crusades and use of radio, television, and film made him one of the most recognized Christian figures of the twentieth century.",
    timelineRole: "Leading evangelist of twentieth-century global evangelicalism.",
    contributions: ["Preached to hundreds of millions worldwide across six decades", "Advised numerous U.S. presidents", "Helped shape modern American evangelicalism"],
    notableWorks: [], theologicalPositions: ["Evangelical conversionism", "Cooperative, non-denominational evangelism"],
    associatedMovements: ["mov_evangelicalism"],
    relatedEvents: ["billy_graham_crusades"],
    sources: ["Just As I Am (autobiography)"]
  },

  /* ---- Reformed church history: additional figures ---- */
  {
    id: "bullinger", name: "Heinrich Bullinger", birthYear: 1504, deathYear: 1575,
    image: "",
    publicDescription: "Zwingli's successor as chief pastor of Zurich, whose four-decade tenure and prolific writing consolidated and exported the Swiss Reformed tradition across Europe.",
    timelineRole: "Zwingli's successor in Zurich; principal author of the Second Helvetic Confession.",
    contributions: ["Stabilized and led the Zurich church for 44 years after Zwingli's death", "Authored the Second Helvetic Confession, adopted by Reformed churches across Europe", "Maintained an enormous international correspondence that unified early Reformed identity"],
    notableWorks: ["work_second_helvetic_confession"], theologicalPositions: ["Covenantal theology", "Reformed doctrine of the sacraments as a middle way between Zwingli and Calvin", "Church-state cooperation under a godly magistrate"],
    associatedMovements: ["mov_calvinism", "mov_reformed_scholasticism"],
    relatedEvents: ["second_helvetic_confession_1566"],
    sources: ["Second Helvetic Confession", "Decades (sermon collection)"],
    fullBiography: [
      "Heinrich Bullinger was only twenty-seven when Zwingli's sudden death at Kappel in 1531 left Zurich's Reformation leaderless and vulnerable to reversal. Elected chief pastor within weeks, Bullinger proved a steadier, more diplomatically minded leader than his predecessor, and his forty-four years at the Grossmünster gave the Swiss Reformation the institutional stability it had lacked. Where Zwingli was a combative innovator, Bullinger was a patient consolidator and correspondent, exchanging thousands of letters with reformers, students, and rulers from England to Hungary.",
      "His most lasting achievement was the Second Helvetic Confession, written originally in 1562 as a private statement of his own faith and expanded for publication in 1566. Adopted formally by the Swiss Reformed cantons and then by Reformed churches in Scotland, Hungary, Poland, and parts of France and the Rhineland, it became one of the most widely subscribed confessional documents of the entire Reformation, doing more than any single text to give the scattered Reformed churches of Europe a shared doctrinal identity distinct from both Rome and Wittenberg.",
      "Bullinger also played a quiet but crucial diplomatic role, sheltering Protestant refugees (including Marian exiles from England) in Zurich and working to hold together a fragile Reformed international against a resurgent Counter-Reformation. By the time of his death in 1575, the Zurich-Geneva axis he had helped maintain — Zwingli's founding insight, Calvin's systematic elaboration, his own confessional consolidation — had become the doctrinal spine of Reformed Protestantism across Switzerland, France, the Netherlands, Scotland, and beyond."
    ]
  },
  {
    id: "beza", name: "Theodore Beza", birthYear: 1519, deathYear: 1605,
    image: "",
    publicDescription: "A French humanist scholar who succeeded Calvin as leader of the Genevan church and academy, sharpening Calvin's theology into the more systematic form that shaped later Reformed orthodoxy.",
    timelineRole: "Calvin's successor in Geneva; bridge between Calvin and later Reformed scholasticism.",
    contributions: ["Led the Geneva Academy and church for four decades after Calvin's death", "Produced an influential Greek New Testament and theological writings used across Reformed Europe", "Systematized and defended Calvin's doctrine of predestination, shaping later Reformed scholasticism"],
    notableWorks: [], theologicalPositions: ["Supralapsarian predestination", "Precise scholastic systematization of Reformed doctrine"],
    associatedMovements: ["mov_calvinism", "mov_reformed_scholasticism"],
    relatedEvents: ["calvin_geneva_ministry"],
    sources: ["Tabula Praedestinationis", "Correspondence with European reformers"]
  },
  {
    id: "ursinus", name: "Zacharias Ursinus", birthYear: 1534, deathYear: 1583,
    image: "",
    publicDescription: "A German Reformed theologian who, with Caspar Olevianus, authored the Heidelberg Catechism, the most widely used catechism in the Reformed tradition.",
    timelineRole: "Principal author of the Heidelberg Catechism.",
    contributions: ["Co-authored the Heidelberg Catechism at the request of Elector Frederick III", "Taught at the University of Heidelberg, training Reformed pastors for the Palatinate"],
    notableWorks: ["work_heidelberg_catechism"], theologicalPositions: ["Covenant theology", "Pastoral, comfort-oriented presentation of Reformed doctrine"],
    associatedMovements: ["mov_calvinism"],
    relatedEvents: ["heidelberg_catechism_1563"],
    sources: ["Heidelberg Catechism"]
  },
  {
    id: "olevianus", name: "Caspar Olevianus", birthYear: 1536, deathYear: 1587,
    image: "",
    publicDescription: "A German Reformed theologian who co-authored the Heidelberg Catechism with Ursinus and helped establish Reformed church order in the Palatinate.",
    timelineRole: "Co-author of the Heidelberg Catechism; organizer of the Palatinate Reformed church.",
    contributions: ["Co-authored the Heidelberg Catechism", "Established Reformed church discipline and governance in the Palatinate"],
    notableWorks: ["work_heidelberg_catechism"], theologicalPositions: ["Covenant theology", "Presbyterian-style church discipline"],
    associatedMovements: ["mov_calvinism"],
    relatedEvents: ["heidelberg_catechism_1563"],
    sources: ["Heidelberg Catechism"]
  },
  {
    id: "de_bres", name: "Guido de Brès", birthYear: 1522, deathYear: 1567,
    image: "",
    publicDescription: "A Reformed preacher in the Low Countries who authored the Belgic Confession and was executed for his faith during the Spanish crackdown on Dutch Protestants.",
    timelineRole: "Author of the Belgic Confession; martyr of the Dutch Reformation.",
    contributions: ["Wrote the Belgic Confession, later adopted as a doctrinal standard of the Dutch Reformed Church", "Preached and organized underground Reformed congregations in the Low Countries under persecution"],
    notableWorks: ["work_belgic_confession"], theologicalPositions: ["Reformed doctrine modeled closely on Calvin and the French Reformed confession", "Church discipline independent of civil rulers hostile to reform"],
    associatedMovements: ["mov_calvinism", "mov_dutch_reformed"],
    relatedEvents: ["belgic_confession_1561"],
    sources: ["Belgic Confession"],
    fullBiography: [
      "Guido de Brès was born in Mons, in the Spanish-ruled Low Countries, and came to Reformed conviction through the wave of Calvinist preaching and literature spreading north from Geneva and France in the 1540s and 1550s. Ministering to underground congregations under threat of Spanish and Catholic persecution, he modeled his work closely on the French Reformed churches, writing in 1561 a comprehensive confession of faith — the Belgic Confession — intended to demonstrate to the Spanish crown that Reformed believers were loyal, orderly subjects rather than seditious radicals, in the hope of securing toleration.",
      "The confession failed to win toleration but succeeded doctrinally: it was quickly adopted by Dutch Reformed congregations and, after revision at the Synod of Dort in 1618-19, became one of the Netherlands' official confessional standards alongside the Heidelberg Catechism and the Canons of Dort — together still known as the 'Three Forms of Unity' in Dutch Reformed and Reformed Presbyterian churches worldwide. De Brès himself did not live to see this: captured after the iconoclastic riots of 1566, he was hanged at Valenciennes in 1567, one of thousands of Reformed believers martyred during Spain's attempt to suppress Protestantism in the Low Countries — a persecution that hardened Dutch Reformed identity and helped fuel the Dutch Revolt against Spanish rule."
    ]
  },
  {
    id: "arminius", name: "Jacobus Arminius", birthYear: 1560, deathYear: 1609,
    image: "",
    publicDescription: "A Dutch Reformed theologian trained under Beza in Geneva whose challenge to strict predestinarian orthodoxy triggered the controversy resolved at the Synod of Dort.",
    timelineRole: "Central figure of the Arminian controversy within the Dutch Reformed Church.",
    contributions: ["Questioned strict supralapsarian predestination while teaching at Leiden", "Prompted the theological controversy that produced the Canons of Dort and the five points of Calvinism (TULIP) as a formal response"],
    notableWorks: [], theologicalPositions: ["Conditional election grounded in foreseen faith", "Resistible grace", "Christ's atonement offered for all, not only the elect"],
    associatedMovements: [],
    relatedEvents: ["arminian_controversy", "remonstrance_1610", "synod_of_dort"],
    sources: ["Declaration of Sentiments"]
  },
  {
    id: "turretin", name: "Francis Turretin", birthYear: 1623, deathYear: 1687,
    image: "",
    publicDescription: "A Geneva-born pastor and professor whose rigorously logical systematic theology became the standard textbook of Reformed orthodoxy for two centuries.",
    timelineRole: "Foremost systematician of Reformed scholasticism.",
    contributions: ["Wrote the Institutio Theologiae Elencticae, organizing Reformed theology as a series of disputed questions", "Taught at the Geneva Academy, training generations of Reformed pastors", "His textbook was used at Princeton Seminary into the nineteenth century"],
    notableWorks: ["work_institutes_elenctic"], theologicalPositions: ["Federal (covenant) theology", "Scholastic method applied to Reformed dogmatics", "Strict Reformed orthodoxy against both Arminianism and Catholic theology"],
    associatedMovements: ["mov_reformed_scholasticism"],
    relatedEvents: [],
    sources: ["Institutio Theologiae Elencticae"]
  },
  {
    id: "hodge_charles", name: "Charles Hodge", birthYear: 1797, deathYear: 1878,
    image: "",
    publicDescription: "The leading theologian of nineteenth-century 'Old Princeton,' whose Systematic Theology carried confessional Reformed orthodoxy into modern American Presbyterianism.",
    timelineRole: "Principal architect of Princeton Theological Seminary's Reformed tradition.",
    contributions: ["Taught at Princeton Seminary for over fifty years", "Wrote a three-volume Systematic Theology defending confessional Calvinism against nineteenth-century liberal theology", "Edited the influential Princeton Review, shaping American Presbyterian thought"],
    notableWorks: ["work_systematic_theology_hodge"], theologicalPositions: ["Confessional Westminster Calvinism", "Biblical inerrancy", "Scholastic Reformed method applied to modern theological controversy"],
    associatedMovements: ["mov_calvinism"],
    relatedEvents: ["old_princeton_theology"],
    sources: ["Systematic Theology"]
  },
  {
    id: "warfield", name: "Benjamin Breckinridge Warfield", birthYear: 1851, deathYear: 1921,
    image: "",
    publicDescription: "The last of the great 'Old Princeton' theologians, best known for his rigorous defense of biblical inerrancy and Reformed orthodoxy against theological liberalism.",
    timelineRole: "Princeton Seminary's foremost defender of biblical inerrancy.",
    contributions: ["Taught theology at Princeton Seminary from 1887 to 1921", "Wrote extensively defending the inspiration and inerrancy of Scripture", "Engaged critically with Darwinism and higher biblical criticism from a confessional Reformed standpoint"],
    notableWorks: [], theologicalPositions: ["Plenary verbal inspiration and inerrancy of Scripture", "Confessional Westminster Calvinism", "Cessation of miraculous spiritual gifts"],
    associatedMovements: ["mov_calvinism"],
    relatedEvents: ["old_princeton_theology"],
    sources: ["The Inspiration and Authority of the Bible"]
  },
  {
    id: "kuyper", name: "Abraham Kuyper", birthYear: 1837, deathYear: 1920,
    image: "",
    publicDescription: "A Dutch theologian, journalist, and statesman who became prime minister of the Netherlands and led a revival of confessional Calvinism known as Neo-Calvinism.",
    timelineRole: "Founder of Neo-Calvinism; Prime Minister of the Netherlands (1901–1905).",
    contributions: ["Founded the Free University of Amsterdam on confessional Reformed principles", "Led a secession from the Dutch state church to form the Reformed Churches in the Netherlands", "Developed 'sphere sovereignty,' applying Calvinist theology to politics, science, and culture", "Delivered the influential Stone Lectures on Calvinism at Princeton in 1898"],
    notableWorks: ["work_lectures_calvinism"], theologicalPositions: ["Sphere sovereignty — each societal sphere (family, church, state, university) is directly under God, not subordinate to the others", "Common grace as the basis for Christian engagement in culture and politics", "Calvinism as a comprehensive 'life system,' not merely a doctrine of salvation"],
    associatedMovements: ["mov_neo_calvinism", "mov_dutch_reformed"],
    relatedEvents: ["kuyper_neo_calvinism", "kuyper_lectures_calvinism"],
    sources: ["Lectures on Calvinism", "Ons Program"],
    fullBiography: [
      "Abraham Kuyper trained as a liberal-leaning Dutch Reformed pastor before a pastoral crisis in his first parish — confronted by working-class parishioners whose vibrant orthodox faith he could not match with his liberal theology — pushed him toward a confessional Calvinism he would spend the rest of his life reviving and modernizing. Restless with purely ecclesiastical work, he moved into journalism and politics, founding the newspaper De Standaard and, in 1879, the Anti-Revolutionary Party, the first confessional political party in Dutch history and a model for Christian democratic movements across Europe.",
      "In 1886 Kuyper led a large secession (the Doleantie) of orthodox congregations out of the more liberal Dutch state church, and in 1892 these united with an earlier 1834 secession to form the Reformed Churches in the Netherlands, a denomination shaped decisively in Kuyper's image. In 1880 he founded the Free University of Amsterdam, explicitly organized around the conviction that every academic discipline — not just theology — needed to be pursued from a Christian starting point, a principle central to what became known as Neo-Calvinism.",
      "Kuyper's most quoted line — 'there is not a square inch in the whole domain of our human existence over which Christ, who is Sovereign over all, does not cry: Mine!' — captures the ambition of his thought: Calvinism, in his view, was not a private doctrine of individual salvation but a comprehensive worldview with implications for politics, science, art, and social life, organized through 'sphere sovereignty,' the idea that family, church, state, business, and university each answer directly to God rather than to one another. He served as Prime Minister of the Netherlands from 1901 to 1905, and his 1898 Stone Lectures on Calvinism at Princeton Seminary carried his ideas to American Reformed circles, where they influenced later movements including Christian Reformed social thought and, indirectly, modern evangelical engagement with culture and politics."
    ]
  },
  {
    id: "machen", name: "J. Gresham Machen", birthYear: 1881, deathYear: 1937,
    image: "",
    publicDescription: "A Princeton and Westminster Seminary New Testament scholar whose resistance to theological liberalism in the Presbyterian Church led to his trial, defrocking, and founding of a new denomination.",
    timelineRole: "Founder of Westminster Theological Seminary and the Orthodox Presbyterian Church.",
    contributions: ["Wrote 'Christianity and Liberalism' (1923), arguing modernist theology was a different religion from historic Christianity", "Founded Westminster Theological Seminary (1929) after Princeton Seminary's reorganization along more liberal lines", "Founded the Orthodox Presbyterian Church (1936) after being tried and removed from the Presbyterian Church USA ministry"],
    notableWorks: [], theologicalPositions: ["Confessional Westminster Calvinism", "Rejection of theological modernism/liberalism as incompatible with historic Christianity", "Biblical inerrancy and the supernatural claims of the New Testament"],
    associatedMovements: ["mov_calvinism"],
    relatedEvents: ["opc_founded", "fundamentalist_modernist"],
    sources: ["Christianity and Liberalism"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PEOPLE };
}
