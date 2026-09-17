/* ==========================================================
   Church History Timeline — Data Layer / New Testament Bible Books (27)
   Part of the split data layer (see js/data/ for the rest):
   categories.js, people.js, works.js, movements.js, events.js,
   bible-categories.js, bible-books.js. Loaded as plain browser
   globals (no bundler) — order matters only in index.html, not
   between these files, since entities cross-reference each other
   by id string, not by direct object reference.
   ========================================================== */

/* ---------- The 27 books of the New Testament ---------- */

const BIBLE_BOOKS = [
  {
    id: "bk_matthew", name: "Matthew", fullTitle: "The Gospel According to Matthew",
    canonicalOrder: 1, category: "Gospel", testament: "New Testament",
    startYear: 75, endYear: 90, importance: 8,
    traditionalAuthor: "The Apostle Matthew, a former tax collector and one of the Twelve",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally the Apostle Matthew; most critical scholars see an anonymous Jewish-Christian author writing for a Jewish-Christian community, using Mark and other sources.",
    authorshipReasoning: [
      "The book itself never names its author; the title 'According to Matthew' was attached by the early second century, reflected in a note preserved by the bishop Papias (via Eusebius) that 'Matthew compiled the sayings in the Hebrew language.' Church tradition from Irenaeus onward took this to mean the apostle Matthew wrote the Gospel that bears his name.",
      "Most critical scholars find that claim hard to square with the text as it stands: this Gospel is written in polished Greek and relies heavily on the Greek wording of Mark's Gospel as a source, which is an odd procedure for an eyewitness apostle to borrow so extensively from someone (Mark) who was not himself an eyewitness of Jesus's ministry. Papias's comment about a 'Hebrew' or Aramaic sayings-collection is also often read as describing a different, now-lost document (sometimes identified with the hypothetical source 'Q') rather than this Gospel itself. The consensus among mainstream scholars is that an anonymous, probably Jewish-Christian, author or school produced the Gospel and it was only later attributed to Matthew; a minority of scholars, particularly in more traditional circles, continue to defend direct or indirect apostolic authorship."
    ],
    datingSummary: "Commonly dated c. 80-90 AD, after Mark and after the Jerusalem Temple's destruction in 70 AD, which the Gospel appears to presuppose.",
    datingReasoning: [
      "Matthew is widely held to depend on Mark's Gospel (usually dated c. 70 AD) as a primary source, which sets an earliest possible date. Matthew 22:7, in a parable about a king who 'sent his troops, destroyed those murderers, and burned their city,' is often read by scholars as an allusion to Rome's destruction of Jerusalem in 70 AD, pointing to a date afterward.",
      "The Gospel's polemical engagement with a formalizing rabbinic Judaism (its sharp exchanges with 'the scribes and Pharisees' in passages like Matthew 23) fits the period after 70 AD when rabbinic Judaism was reorganizing at Jamnia/Yavneh and Jewish-Christian relations were hardening. Its use by Ignatius of Antioch in the early second century sets a firm outer limit around 110 AD. A minority of conservative scholars date it earlier, in the 60s, treating Matthew 22:7 as generic judgment imagery rather than a reference to an event already past."
    ],
    placeOfWriting: "Uncertain; Antioch in Syria is the traditional and most widely favored guess",
    audience: "A Jewish-Christian community wrestling with its relationship to a broader, increasingly separate Judaism",
    summary: "Presents Jesus as the fulfillment of Hebrew Scripture and the promised Jewish messiah, structured around five great blocks of teaching that echo the five books of Moses.",
    description: "Matthew opens with a genealogy tracing Jesus to Abraham and David, and repeatedly frames events in Jesus's life as fulfilling Old Testament prophecy ('this was to fulfill what was spoken by the prophet...'). It organizes Jesus's teaching into five discourses, most famously the Sermon on the Mount, and closes with the Great Commission to make disciples of all nations.",
    keyThemes: ["Jesus as fulfillment of Hebrew prophecy", "Jesus as a new Moses", "the Kingdom of Heaven", "conflict with Pharisaic Judaism", "the Great Commission"],
    relatedBooks: ["bk_mark", "bk_luke"],
    tags: ["gospel", "synoptic"],
    sources: ["Raymond E. Brown, An Introduction to the New Testament (1997)", "Bart D. Ehrman, The New Testament: A Historical Introduction (7th ed.)", "D.A. Carson & Douglas J. Moo, An Introduction to the New Testament (2nd ed.)"]
  },
  {
    id: "bk_mark", name: "Mark", fullTitle: "The Gospel According to Mark",
    canonicalOrder: 2, category: "Gospel", testament: "New Testament",
    startYear: 66, endYear: 73, importance: 8,
    traditionalAuthor: "John Mark, an associate of the Apostle Peter (and of Paul and Barnabas)",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "Traditionally John Mark, recording Peter's preaching; most scholars accept the Gospel is anonymous but find the Petrine-connection tradition plausible, if unprovable.",
    authorshipReasoning: [
      "The earliest external evidence comes from Papias (early second century, preserved by Eusebius), who reports on the authority of 'the Elder' that Mark, 'having been Peter's interpreter, wrote down accurately, though not in order, all that he remembered' of Peter's teaching about Jesus. This tradition is echoed by Irenaeus, Clement of Alexandria, and others, and is consistent enough across independent early sources that many scholars treat it as carrying real historical weight, even though the Gospel text itself never names an author.",
      "Critical scholars note that Papias's testimony was partly apologetic — explaining away the Gospel's lack of strict chronological order and its author's lack of apostolic status by tying it to Peter's authority — and that the text shows no obvious first-person Petrine perspective. Because the work is formally anonymous, some scholars remain agnostic about who wrote it beyond 'an early Christian, probably of Gentile or diaspora Jewish background, writing for a non-Palestinian audience' (the Gospel explains Jewish customs and translates Aramaic phrases for its readers)."
    ],
    datingSummary: "Widely dated c. 66-73 AD, around the time of the First Jewish-Roman War and the Temple's destruction — making it, on the majority view, the earliest written Gospel.",
    datingReasoning: [
      "Mark 13, Jesus's 'Olympic Discourse' predicting the Temple's destruction ('not one stone will be left upon another'), is read by most scholars either as written in the shadow of the Jewish revolt (66-70 AD) as it was unfolding, or shortly after the Temple actually fell in 70 AD; a minority of more conservative scholars take the prediction as genuine prophecy uttered decades earlier and date the Gospel before 70 AD, sometimes as early as the late 50s or early 60s, partly on the strength of a disputed tradition that it was written during or shortly after Peter's lifetime (Peter is traditionally thought to have died c. 64-68 AD under Nero).",
      "Mark is almost universally regarded (per the theory of 'Markan priority') as the earliest of the four canonical Gospels and a source used by both Matthew and Luke, which sets a firm outer limit — it must predate Matthew and Luke, themselves usually placed in the 80s. Its comparatively simple Christology, unpolished Greek, and lack of a birth narrative are also cited as consistent with an earlier composition date relative to the other Gospels."
    ],
    placeOfWriting: "Traditionally Rome; some scholars propose Syria or another location in the eastern Mediterranean",
    audience: "Likely a Gentile-inclusive Christian community unfamiliar with Jewish customs, possibly facing persecution",
    summary: "The shortest and, on the majority scholarly view, earliest Gospel — a fast-paced narrative that emphasizes Jesus's actions and suffering over his teaching, and repeatedly highlights the disciples' failure to understand who he is.",
    description: "Mark moves quickly ('immediately' is a favorite word) from Jesus's baptism through a ministry of healing, exorcism, and controversy in Galilee, before an extended account of his final days in Jerusalem. Its original ending (16:8) breaks off abruptly at the empty tomb, with the women fleeing in fear and saying nothing to anyone — a famously stark conclusion that later scribes supplemented with additional verses found in most modern Bibles as a bracketed appendix.",
    keyThemes: ["the 'Messianic Secret'", "the suffering Son of Man", "the disciples' misunderstanding", "urgency and action"],
    relatedBooks: ["bk_matthew", "bk_luke"],
    tags: ["gospel", "synoptic"],
    sources: ["Joel Marcus, Mark 1-8 (Anchor Bible)", "Bart D. Ehrman, The New Testament: A Historical Introduction (7th ed.)", "Eusebius, Ecclesiastical History (quoting Papias)"]
  },
  {
    id: "bk_luke", name: "Luke", fullTitle: "The Gospel According to Luke",
    canonicalOrder: 3, category: "Gospel", testament: "New Testament",
    startYear: 75, endYear: 90, importance: 8,
    traditionalAuthor: "Luke, a physician and traveling companion of the Apostle Paul",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "Traditionally Luke, a companion of Paul, on the strength of a matching writing style between this Gospel and Acts and later church testimony; the identification is widely, though not universally, accepted.",
    authorshipReasoning: [
      "Luke and Acts are two volumes of a single work by the same, formally anonymous, author (both are addressed to a patron named Theophilus, and Acts opens by referring back to 'my first book'). Acts contains several 'we' passages (e.g., Acts 16:10-17, 20:5-21:18, 27:1-28:16) where the narration shifts to first-person plural, implying the author was present as a traveling companion on those legs of Paul's journeys. Church tradition from the second century (the anti-Marcionite prologues, Irenaeus) identifies this companion as Luke, the 'beloved physician' mentioned in Colossians 4:14 and 2 Timothy 4:11.",
      "Most scholars find this a reasonably strong case relative to the other Gospels, since it rests on an internal textual clue (the 'we' passages) rather than external tradition alone, though some critical scholars argue the 'we' passages are a literary device borrowed from ancient sea-voyage narratives rather than a genuine eyewitness marker, and note apparent tensions between Acts's portrayal of Paul and Paul's own letters (for instance, over the Jerusalem council) that a close companion might be expected to get right."
    ],
    datingSummary: "Usually dated alongside Acts, c. 80-90 AD; a minority view places both books in the early 60s, shortly after the events Acts narrates.",
    datingReasoning: [
      "Because Luke appears to use Mark as a source (again via 'Markan priority'), it must postdate Mark, commonly placed c. 70 AD. Luke's version of Jesus's Temple-destruction prediction (Luke 21:20, which specifically mentions Jerusalem 'surrounded by armies') is often read as a clearer, more historically-informed rewriting of Mark's more generic prophecy, suggesting Luke wrote after 70 AD with knowledge of how the siege actually unfolded.",
      "A significant minority of scholars — including some who otherwise accept Markan priority — favor an earlier date in the early-to-mid 60s, primarily because Acts ends abruptly with Paul under house arrest in Rome awaiting trial (c. 60-62 AD) without narrating the outcome, his eventual death, the Neronian persecution (64 AD), or the fall of Jerusalem (70 AD) — all of which, they argue, a later author would very likely have mentioned. The majority response is that Acts's ending serves the author's literary and theological purposes (the gospel reaching Rome, 'the ends of the earth') regardless of when it was actually written, so the silence is not decisive."
    ],
    placeOfWriting: "Uncertain; possibly Greece or Rome",
    audience: "A Gentile audience, represented by the patron Theophilus, interested in Christianity's respectability and historical grounding",
    summary: "A carefully constructed, historically-framed account emphasizing Jesus's concern for the poor, outcasts, and Gentiles, forming the first half of a two-volume work continued in Acts.",
    description: "Luke opens with a formal historical preface claiming to have 'investigated everything carefully from the beginning,' includes infancy narratives centered on Mary and set alongside John the Baptist's birth, and gives particular attention to parables and episodes involving the marginalized — the Prodigal Son, the Good Samaritan, Zacchaeus the tax collector, and women among Jesus's followers.",
    keyThemes: ["concern for the poor and outcast", "the Holy Spirit", "prayer", "salvation extended to Gentiles", "Jerusalem as narrative destination"],
    relatedBooks: ["bk_mark", "bk_matthew", "bk_acts"],
    tags: ["gospel", "synoptic"],
    sources: ["Joseph A. Fitzmyer, The Gospel According to Luke (Anchor Bible)", "Raymond E. Brown, An Introduction to the New Testament (1997)"]
  },
  {
    id: "bk_john", name: "John", fullTitle: "The Gospel According to John",
    canonicalOrder: 4, category: "Gospel", testament: "New Testament",
    startYear: 90, endYear: 100, importance: 9,
    traditionalAuthor: "The Apostle John, son of Zebedee, identified with the Gospel's 'disciple whom Jesus loved'",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally the Apostle John; many scholars instead see the product of a 'Johannine community' drawing on the testimony of an eyewitness 'Beloved Disciple' who may or may not have been the apostle himself.",
    authorshipReasoning: [
      "The Gospel claims eyewitness authority for a figure called 'the disciple whom Jesus loved,' and its closing verses (John 21:24) state that 'this is the disciple who is testifying to these things and has written them.' Second-century tradition (Irenaeus, citing Polycarp, who reportedly knew John) identifies this disciple as the Apostle John, and the Gospel's distinctive theology was read by the early church as the mature reflection of an eyewitness late in life.",
      "The Gospel's style, vocabulary, and portrait of Jesus differ so markedly from the three Synoptic Gospels — long theological discourses rather than short parables, an explicit 'I am' Christology, no exorcisms or a Gethsemane agony scene — that many scholars doubt it comes directly from the same social circle as an original Galilean fisherman-apostle, and instead see a 'Johannine school' or community that developed and wrote down a distinctive strand of Jesus tradition over decades, possibly under the guidance of (or in tribute to) an authoritative founding eyewitness who was not necessarily the son of Zebedee. Some propose 'John the Elder,' a shadowy figure mentioned by Papias as distinct from the apostle, as the community's founding authority instead."
    ],
    datingSummary: "Generally regarded as the latest canonical Gospel, c. 90-100 AD.",
    datingReasoning: [
      "John reflects a more developed theology and a sharper, more settled conflict with 'the Jews' (likely reflecting tensions after Jewish Christians were being formally excluded from synagogues, cf. John 9:22, 16:2 — a process associated with the period after 70 AD) than the Synoptics, which most scholars take as a sign of later composition. A tiny fragment of John's Gospel (P52, the Rylands papyrus) found in Egypt is usually dated to the early second century, which sets a firm outer limit and fits comfortably with a date around 90-100 AD, since a Gospel written in Asia Minor would need time to circulate to Egypt.",
      "Internal clues like the reference to Peter's manner of death (John 21:18-19, read as alluding to his crucifixion, traditionally c. 64-68 AD) as already past, and to the Beloved Disciple's death being a matter of community concern (21:20-23), suggest the Gospel (or at least its final chapter) was completed well after the deaths of the first-generation apostles, near the end of the first century."
    ],
    placeOfWriting: "Traditionally Ephesus; the internal evidence is compatible with several eastern Mediterranean locations",
    audience: "A Christian community in dialogue with, and increasingly separated from, a local synagogue",
    summary: "A theologically distinctive account built around seven 'signs' and long discourses in which Jesus repeatedly declares his identity ('I am the bread of life,' 'the light of the world,' 'the good shepherd'), framed by a prologue identifying Jesus as the eternal, divine Word.",
    description: "John's Gospel opens not with a genealogy or birth narrative but a cosmic prologue ('In the beginning was the Word'), and structures Jesus's public ministry around symbolic miracles ('signs') paired with extended teaching discourses, before an unusually long account of Jesus's final night with his disciples (chapters 13-17, including the 'farewell discourse') leading into the passion and resurrection.",
    keyThemes: ["Jesus as the divine Logos", "'I am' sayings", "signs and belief", "eternal life", "the Paraclete/Holy Spirit"],
    relatedBooks: ["bk_1john", "bk_2john", "bk_3john"],
    tags: ["gospel"],
    sources: ["Raymond E. Brown, The Gospel According to John (Anchor Bible)", "Bart D. Ehrman, The New Testament: A Historical Introduction (7th ed.)"]
  },
  {
    id: "bk_acts", name: "Acts", fullTitle: "The Acts of the Apostles",
    canonicalOrder: 5, category: "History", testament: "New Testament",
    startYear: 62, endYear: 90, importance: 8,
    traditionalAuthor: "Luke, the same author as the Gospel of Luke",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "Same authorship case as the Gospel of Luke — traditionally Luke the physician, a companion of Paul, based on the internal 'we' passages and second-century church testimony.",
    authorshipReasoning: [
      "Acts is explicitly the sequel to the Gospel of Luke, addressed to the same patron (Theophilus) and referring back to 'the first book,' so the authorship question is really one question for both volumes — see the Gospel of Luke's entry for the fuller discussion of the 'we' passages and the traditional identification with Luke the physician.",
      "One distinct issue for Acts specifically: critical scholars have long noted apparent discrepancies between Acts's account of Paul's career (for instance, its version of the Jerusalem council and Paul's visits to Jerusalem) and Paul's own descriptions in Galatians, which some see as evidence against authorship by a close traveling companion, while others attribute the differences to Acts having different narrative aims (writing history/apologetic for a broad audience) rather than being a discredited eyewitness account."
    ],
    datingSummary: "Dated together with Luke, most often c. 80-90 AD; a significant minority favors the early 60s, shortly after the narrative's own final events.",
    datingReasoning: [
      "See the Gospel of Luke's entry for the shared dating logic (dependence on Mark, the 'surrounded by armies' detail in the parallel Gospel, and the vigorous minority argument from Acts's abrupt ending). The abrupt-ending argument is strongest for Acts itself: the book stops with Paul awaiting trial in Rome (c. 60-62 AD) and never narrates his fate, the deaths of James (62 AD) or Peter and Paul (mid-60s), the Neronian persecution (64 AD), or the Jewish revolt and Temple's destruction (66-70 AD) — striking omissions if Acts were written decades later, given how central those events would be to the story of the early church.",
      "The majority position holds that Acts's ending is a deliberate literary and theological choice (the gospel has now reached Rome, the heart of the empire) rather than a sign of an early composition date, and situates Acts alongside the Gospel of Luke in the 80s on the same grounds used for the Gospel."
    ],
    placeOfWriting: "Uncertain; the same range of guesses as the Gospel of Luke",
    audience: "The same audience as the Gospel of Luke, represented by Theophilus",
    summary: "Narrates the early church's growth from Pentecost in Jerusalem to Paul's imprisonment in Rome, tracing the gospel's spread from a Jewish sect to a Gentile-inclusive, empire-wide movement.",
    description: "Acts opens with Jesus's ascension and the Spirit's descent at Pentecost, follows Peter and the Jerusalem church through its early controversies (including the decision to admit Gentiles without requiring circumcision, Acts 15), then shifts focus to Paul's conversion and three missionary journeys across Asia Minor and Greece, and closes with Paul's arrest, trials, and voyage to Rome.",
    keyThemes: ["the Holy Spirit's guidance", "the gospel's spread to Gentiles", "the Jerusalem council", "Paul's missionary journeys", "continuity between Judaism and the church"],
    relatedBooks: ["bk_luke", "bk_romans", "bk_galatians"],
    tags: ["history", "acts"],
    sources: ["F.F. Bruce, The Book of Acts (NICNT)", "Raymond E. Brown, An Introduction to the New Testament (1997)"]
  },
  {
    id: "bk_romans", name: "Romans", fullTitle: "Paul's Letter to the Romans",
    canonicalOrder: 6, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 56, endYear: 57, importance: 9,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "Universally accepted as an authentic letter of Paul — one of the seven 'undisputed' Pauline epistles.",
    authorshipReasoning: [
      "Romans is among the small set of letters (with 1-2 Corinthians, Galatians, Philippians, 1 Thessalonians, and Philemon) whose Pauline authorship is accepted essentially without dispute across the theological spectrum, from the most conservative to the most skeptical critical scholars. Its vocabulary, style, theological argumentation, and autobiographical details are internally consistent with the other six undisputed letters and with what can be independently pieced together about Paul's career from Acts.",
      "The letter includes personal greetings to numerous named individuals in Rome (chapter 16) whom Paul had met elsewhere in his travels, consistent with a real letter from a real, well-traveled correspondent rather than a later pseudonymous composition attempting to imitate Paul; some scholars have questioned whether chapter 16 was originally part of the letter to Rome or a separate note (perhaps to Ephesus) later appended, but this text-critical question doesn't affect the consensus on Pauline authorship of the letter as a whole."
    ],
    datingSummary: "Confidently dated c. 56-57 AD, near the end of Paul's third missionary journey, based on details matching Acts and the other undisputed letters.",
    datingReasoning: [
      "Paul writes that he is about to travel to Jerusalem with a financial collection for the Jerusalem church (Romans 15:25-28) before hoping to visit Rome en route to Spain — a itinerary that lines up closely with Acts's account of Paul's final journey to Jerusalem after his extended stay in Corinth (Acts 20:1-3), and with references to the same collection project in 1-2 Corinthians, letting scholars cross-reference multiple independent letters to triangulate a date.",
      "Paul greets Phoebe, a deacon from Cenchreae (the port of Corinth), and the letter's themes and companions closely match the period he spent wintering in Corinth around 56-57 AD, which is why virtually all scholars — traditional and critical alike — converge on this narrow window."
    ],
    placeOfWriting: "Corinth (or nearby Cenchreae), during Paul's three-month stay there",
    audience: "The Christian community in Rome, which Paul had not yet visited",
    summary: "Paul's longest and most systematic letter, laying out his understanding of sin, righteousness, faith, and God's plan for both Jews and Gentiles, before writing to a church he hoped to visit on his way to Spain.",
    description: "Romans develops a sustained theological argument: all humanity (Jew and Gentile alike) stands under sin, righteousness comes as a gift through faith rather than through observing the Jewish law, and this good news is 'the power of God for salvation to everyone who believes, to the Jew first and also to the Greek.' Paul wrestles at length (chapters 9-11) with why many Jews had not accepted the gospel, before turning to practical ethical instruction.",
    keyThemes: ["justification by faith", "sin and grace", "the law's role", "Israel's place in God's plan", "Christian ethics"],
    relatedBooks: ["bk_galatians", "bk_1corinthians", "bk_acts"],
    tags: ["epistle", "pauline"],
    sources: ["Douglas J. Moo, The Epistle to the Romans (NICNT)", "James D.G. Dunn, Romans (Word Biblical Commentary)"]
  },
  {
    id: "bk_1corinthians", name: "1 Corinthians", fullTitle: "Paul's First Letter to the Corinthians",
    canonicalOrder: 7, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 53, endYear: 54, importance: 7,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters; authenticity is essentially unquestioned.",
    authorshipReasoning: [
      "1 Corinthians is accepted as genuinely Pauline across virtually the entire scholarly spectrum. It responds directly to specific, named problems in a specific congregation (factionalism, a lawsuit, a scandalous relationship, disputes over food sacrificed to idols, spiritual gifts, the resurrection) with a personal, situational immediacy that reads as authentic correspondence rather than later imitation.",
      "Paul refers to his own earlier visit to Corinth, an earlier (non-surviving) letter he had already sent them (1 Corinthians 5:9), and news brought to him by 'Chloe's people' and a delegation — the kind of concrete, checkable social detail that is very hard to fabricate and that fits comfortably with what Acts and Paul's other letters independently say about his Corinthian ministry."
    ],
    datingSummary: "Dated c. 53-54 AD, written from Ephesus during Paul's roughly three-year stay there.",
    datingReasoning: [
      "Paul states he is writing from Ephesus and plans to stay until Pentecost (1 Corinthians 16:8), which scholars correlate with Acts 19's account of Paul's extended Ephesian ministry, itself datable relative to the more securely fixed Gallio inscription (which places Paul in Corinth c. 51-52 AD, shortly before his Ephesian stay) — one of the few points in Paul's chronology anchored by an external, non-biblical inscription.",
      "The letter's references to ongoing contact and travel plans among Paul, Timothy, and Apollos, and its place in the sequence of the Corinthian correspondence (an earlier lost letter, this one, and 2 Corinthians), all fit a composition in the early-to-mid 50s with unusually little scholarly disagreement over the date."
    ],
    placeOfWriting: "Ephesus",
    audience: "The fractious, spiritually gifted but ethically troubled church at Corinth",
    summary: "Paul addresses a series of specific crises in the Corinthian church — factionalism, sexual ethics, lawsuits, worship disorder, and doubts about the resurrection — with both sharp correction and, in chapter 13, one of the most famous passages in the New Testament on love.",
    description: "Written in response to reports and a letter from the Corinthians, Paul works through their divisions (over which teacher to follow), a case of serious sexual immorality, lawsuits between believers, questions about marriage and celibacy, food offered to idols, the proper conduct of worship (including spiritual gifts and the Lord's Supper), and closes with an extended defense of the bodily resurrection.",
    keyThemes: ["church unity", "Christian ethics", "spiritual gifts", "love (agape)", "bodily resurrection"],
    relatedBooks: ["bk_2corinthians", "bk_romans"],
    tags: ["epistle", "pauline"],
    sources: ["Gordon D. Fee, The First Epistle to the Corinthians (NICNT)", "Anthony C. Thiselton, The First Epistle to the Corinthians (NIGTC)"]
  },
  {
    id: "bk_2corinthians", name: "2 Corinthians", fullTitle: "Paul's Second Letter to the Corinthians",
    canonicalOrder: 8, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 55, endYear: 56, importance: 6,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters, though many scholars think the text as we have it may be a later editorial combination of parts of more than one original letter.",
    authorshipReasoning: [
      "Pauline authorship of the material in 2 Corinthians is not seriously disputed. What is debated is the letter's literary unity: its abrupt shift in tone between chapters 1-9 (largely warm and reconciliatory) and chapters 10-13 (sharply defensive and polemical) has led many scholars to propose that 2 Corinthians as it now stands stitches together fragments of two or more originally separate Pauline letters — part of what Paul calls a 'severe letter' (2 Corinthians 2:4, 7:8) and a later, more conciliatory one.",
      "This 'partition theory' remains debated rather than settled, and it doesn't affect the underlying point that every piece of the text is regarded as authentically Paul's own writing; the question is purely about how an early editor may have compiled Paul's correspondence with Corinth into its current form."
    ],
    datingSummary: "Dated c. 55-56 AD, shortly after 1 Corinthians, from Macedonia.",
    datingReasoning: [
      "Paul describes traveling on to Macedonia after leaving Ephesus (2 Corinthians 2:12-13, 7:5), matching the itinerary implied at the end of 1 Corinthians and in Acts 20:1, and reports relief at news from Titus about the Corinthians' response to his previous ('severe') letter — placing the bulk of the letter in the months following 1 Corinthians.",
      "Because the letter continues the same collection-for-Jerusalem project discussed in 1 Corinthians and later in Romans, and reflects the same general Ephesian-to-Macedonian-to-Corinth itinerary known from Acts, scholars date it with fairly high confidence to 55-56 AD, shortly before Paul's final visit to Corinth and the writing of Romans."
    ],
    placeOfWriting: "Macedonia (possibly Philippi)",
    audience: "The church at Corinth, following a painful conflict with Paul",
    summary: "A deeply personal letter mixing relief and warmth (at news the Corinthians had responded well to a previous painful letter) with a fierce defense of Paul's apostolic authority against rival 'super-apostles' undermining him in Corinth.",
    description: "Paul reflects on suffering and comfort, defends the 'new covenant' ministry against comparison with rival teachers, appeals for generosity toward the Jerusalem collection (chapters 8-9), and — in a sharply different tone in chapters 10-13 — mounts an ironic, reluctant defense of his own apostolic credentials against opponents who questioned his authority and rhetorical polish.",
    keyThemes: ["apostolic suffering and authority", "reconciliation", "generosity/the collection", "the 'new covenant'", "boasting in weakness"],
    relatedBooks: ["bk_1corinthians", "bk_romans"],
    tags: ["epistle", "pauline"],
    sources: ["Victor Paul Furnish, II Corinthians (Anchor Bible)", "Margaret E. Thrall, The Second Epistle to the Corinthians (ICC)"]
  },
  {
    id: "bk_galatians", name: "Galatians", fullTitle: "Paul's Letter to the Galatians",
    canonicalOrder: 9, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 48, endYear: 55, importance: 7,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters, and among the most confidently and personally identifiable as Paul's own writing.",
    authorshipReasoning: [
      "Galatians is arguably the most autobiographically detailed of Paul's letters — he recounts his conversion, his early relationship (and periodic conflict) with the Jerusalem apostles, and a public confrontation with Peter at Antioch, all in service of a passionate argument about the letter's central topic (justification apart from the Jewish law). This first-person intensity and specificity is a major reason its authenticity is essentially unquestioned.",
      "Its close verbal and theological overlap with Romans on the doctrine of justification by faith, written in a very different emotional register (Galatians is urgent and confrontational; Romans is measured and systematic), is itself often cited as evidence of a single author working through the same ideas at different moments and for different purposes, rather than either being a later imitation of the other."
    ],
    datingSummary: "One of the most debated dates in the Pauline corpus, ranging from c. 48 AD (if written just before the Jerusalem council) to the mid-50s (if written after it and addressed to churches further north).",
    datingReasoning: [
      "The dating dispute hinges on which 'Galatia' Paul means and how the letter's account of a Jerusalem visit relates to the Jerusalem council in Acts 15. Proponents of the 'South Galatian' theory identify the recipients with churches Paul founded on his first missionary journey (in the Roman province of Galatia, in southern Asia Minor) and typically date the letter very early, c. 48-49 AD, possibly even before the Jerusalem council — making it, on this view, Paul's earliest surviving letter.",
      "Proponents of the older 'North Galatian' theory identify the recipients with the ethnic Galatian region further north, which Paul is thought to have visited only on his second missionary journey, and date the letter later, in the early-to-mid 50s, after the Jerusalem council, seeing Galatians 2 as Paul's own account of that same council. Both camps remain well represented in scholarship, with no firm consensus, though the letter's fierce urgency about the Jerusalem council's implications leads many to prefer a date close to the council's immediate aftermath either way."
    ],
    placeOfWriting: "Uncertain — possibly Antioch, Ephesus, or Macedonia, depending on the dating theory adopted",
    audience: "Gentile converts in the Roman province (or region) of Galatia, being pressured by other teachers to adopt Jewish law observance, including circumcision",
    summary: "Paul's most polemical letter, written 'astonished' that Galatian converts were abandoning the gospel of grace for a version of Christianity requiring circumcision and law-observance, and defending his own apostolic authority as directly given by revelation, not derived from the Jerusalem apostles.",
    description: "Paul opens without his usual thanksgiving, moving straight to alarm that the Galatians are turning to 'a different gospel.' He defends his apostolic call as coming directly from Christ, recounts a confrontation with Peter over table fellowship with Gentiles, and argues at length that righteousness comes through faith, not law-observance, memorably summarizing Christian freedom: 'it is for freedom that Christ has set us free.'",
    keyThemes: ["justification by faith apart from the law", "Christian freedom", "the Spirit versus the flesh", "Paul's apostolic authority", "unity of Jew and Gentile in Christ"],
    relatedBooks: ["bk_romans", "bk_acts"],
    tags: ["epistle", "pauline"],
    sources: ["J. Louis Martyn, Galatians (Anchor Bible)", "F.F. Bruce, The Epistle to the Galatians (NIGTC)"]
  },
  {
    id: "bk_ephesians", name: "Ephesians", fullTitle: "Paul's Letter to the Ephesians",
    canonicalOrder: 10, category: "Pauline-Disputed", testament: "New Testament",
    startYear: 60, endYear: 95, importance: 6,
    traditionalAuthor: "The Apostle Paul, writing from a Roman imprisonment",
    authorshipConsensus: "Majority Critical",
    authorshipSummary: "Traditionally Paul, written during his Roman imprisonment; the majority of critical scholars consider it pseudonymous, written in Paul's name by a later admirer, making it one of the most disputed authorship questions in the New Testament.",
    authorshipReasoning: [
      "Ephesians claims Pauline authorship (1:1) and was accepted as genuinely Paul's throughout most of church history. It shares extensive material with Colossians (roughly a third of its verses have close parallels), which traditionalists read as Paul reusing his own material in companion letters carried by the same courier, Tychicus.",
      "Since the nineteenth century, a majority of critical scholars have concluded Ephesians was written by someone else in Paul's name, citing an unusually high concentration of words not found elsewhere in Paul's undisputed letters, long and elaborate Greek sentence structures uncharacteristic of Paul's other writing, a notably more developed and 'cosmic' theology of the church as a unified, worldwide institution (rather than Paul's usual focus on individual local congregations), and its close but not identical relationship to Colossians, which some read as the work of an imitator using Colossians as a model. Pseudonymous letter-writing in an admired teacher's name was a recognized literary convention in antiquity, and many scholars think a member of a 'Pauline school' produced Ephesians after Paul's death to apply and extend his theology to new circumstances. A significant minority, including many more traditional/evangelical scholars, continue to defend direct Pauline authorship, arguing the stylistic differences are explainable by Ephesians's unusual purpose as a circular, general letter (rather than addressing a specific local crisis) and noting the letter's unanimous acceptance as Pauline in the early church."
    ],
    datingSummary: "c. 60-62 AD if genuinely Pauline (during his Roman house arrest); c. 80-95 AD if pseudonymous, as most critical scholars hold.",
    datingReasoning: [
      "If authentically Pauline, Ephesians is usually grouped with Colossians and Philemon as one of the 'Prison Epistles,' written during Paul's Roman imprisonment described at the end of Acts, c. 60-62 AD.",
      "If pseudonymous, as most critical scholars conclude, it would need to postdate Paul's death (traditionally mid-60s AD) by enough time for his letters to be collected and imitated, and its developed ecclesiology (viewing 'the church' as a single, unified, worldwide body — see especially chapter 4) is often read as reflecting a later, post-apostolic stage of church self-understanding, leading most who hold this view to place it in the 80s or 90s AD, roughly contemporary with other disputed or pseudonymous NT letters."
    ],
    placeOfWriting: "If genuine: Rome. If pseudonymous: unknown, likely within a Pauline circle in Asia Minor",
    audience: "Possibly a circular letter intended for multiple churches in Asia Minor, not just Ephesus specifically (the words 'in Ephesus' are missing from some of the earliest manuscripts)",
    summary: "A sweeping, meditative letter on God's cosmic plan to unite all things in Christ and to reconcile Jew and Gentile into 'one new humanity,' followed by practical instruction for households and a famous closing image of spiritual armor.",
    description: "Ephesians moves from an extended, liturgical-sounding blessing praising God's eternal plan, through a description of the church as Christ's body uniting formerly hostile Jews and Gentiles, to practical household instructions (on marriage, parents and children, masters and slaves) and a closing exhortation to 'put on the whole armor of God.'",
    keyThemes: ["the church as Christ's body", "unity of Jew and Gentile", "grace through faith", "household relationships", "spiritual warfare"],
    relatedBooks: ["bk_colossians", "bk_philemon"],
    tags: ["epistle", "pauline", "disputed"],
    sources: ["Andrew T. Lincoln, Ephesians (Word Biblical Commentary)", "Bart D. Ehrman, Forged: Writing in the Name of God (2011)", "Peter T. O'Brien, The Letter to the Ephesians (Pillar NT Commentary)"]
  },
  {
    id: "bk_philippians", name: "Philippians", fullTitle: "Paul's Letter to the Philippians",
    canonicalOrder: 11, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 54, endYear: 62, importance: 6,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters.",
    authorshipReasoning: [
      "Philippians is universally accepted as authentically Pauline, marked by a warmth and personal affection (Paul calls the Philippians his 'joy and crown') consistent with his close relationship to this church, the first he founded in Europe (Acts 16).",
      "Some scholars propose that Philippians, like 2 Corinthians, may combine fragments of more than one original letter from Paul to the Philippians (given an abrupt tonal shift at 3:2), but as with 2 Corinthians this is a question of editorial compilation, not of authenticity — every proposed fragment is still considered genuinely Pauline."
    ],
    datingSummary: "Dated to one of Paul's imprisonments, most often his Roman imprisonment c. 60-62 AD, though an earlier Ephesian imprisonment (mid-50s) is a live alternative.",
    datingReasoning: [
      "Paul writes as a prisoner (Philippians 1:7, 13-14) hoping for eventual release, and mentions being guarded by 'the whole imperial guard' (praetorium) and greetings from 'those of Caesar's household' (4:22), details traditionally read as pointing to Rome and grouping the letter with the other 'Prison Epistles' around 60-62 AD.",
      "A substantial minority of scholars instead propose an earlier imprisonment at Ephesus (alluded to only indirectly elsewhere, e.g. 1 Corinthians 15:32, 2 Corinthians 1:8), reasoning that the letter implies an unusually large number of trips between Paul and Philippi that fit better with the shorter distance from Ephesus than from Rome; 'Caesar's household' and 'praetorium' could also refer to imperial administrative staff in provincial cities, not just Rome itself. No consensus has been reached, though the traditional Roman setting remains the most widely cited."
    ],
    placeOfWriting: "Most likely Rome; possibly Ephesus",
    audience: "The church at Philippi, a Roman colony in Macedonia and Paul's first European congregation",
    summary: "A warm, personal 'thank-you' letter to Paul's favorite congregation, written from prison, urging joy and unity and including an early Christian hymn (2:6-11) celebrating Christ's self-emptying humility and subsequent exaltation.",
    description: "Paul thanks the Philippians for financial support sent via Epaphroditus, reflects on his imprisonment as advancing the gospel, urges the church toward humility and unity by quoting what may be an early hymn about Christ 'emptying himself' to take human form and being obedient to death on a cross, and repeatedly returns to the theme of joy despite hardship.",
    keyThemes: ["joy amid suffering", "humility and unity", "the 'kenosis' (self-emptying) of Christ", "partnership in the gospel", "contentment"],
    relatedBooks: ["bk_ephesians", "bk_philemon"],
    tags: ["epistle", "pauline"],
    sources: ["Gordon D. Fee, Paul's Letter to the Philippians (NICNT)", "Moises Silva, Philippians (Baker Exegetical Commentary)"]
  },
  {
    id: "bk_colossians", name: "Colossians", fullTitle: "Paul's Letter to the Colossians",
    canonicalOrder: 12, category: "Pauline-Disputed", testament: "New Testament",
    startYear: 60, endYear: 80, importance: 5,
    traditionalAuthor: "The Apostle Paul, writing from prison",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally Paul; scholarship is genuinely and closely divided, with roughly as many critical scholars defending Pauline authorship as doubting it — making Colossians less settled toward pseudonymity than Ephesians, but more contested than the undisputed letters.",
    authorshipReasoning: [
      "Colossians presents itself as Paul's letter (1:1, 4:18, 'I, Paul, write this greeting in my own hand'), sent with Tychicus alongside the very personal, universally accepted letter to Philemon, which names several of the same people (Onesimus, Archippus, Epaphras) and is set in the same location — a strong point in favor of common, genuine authorship for scholars who find the connection compelling.",
      "Scholars who doubt Pauline authorship point to vocabulary and style noticeably different from the undisputed letters (long, list-like sentences; distinctive theological terms), and a Christology that describes Christ in unusually exalted, cosmic terms ('the image of the invisible God... in him all things were created') that some see as reflecting later theological development, possibly responding to an early form of Gnostic-influenced teaching that some scholars think postdates Paul. Because the case in either direction is less overwhelming than for Ephesians or the Pastorals, a large share of moderate and even some critical scholars continue to accept Pauline authorship, often explaining stylistic differences by Paul's use of a secretary (amanuensis) with more compositional freedom, or by the unusual 'heresy' he was combating pushing him toward unfamiliar vocabulary."
    ],
    datingSummary: "c. 60-62 AD if genuinely Pauline (grouped with the other Prison Epistles); c. 70-80 AD if pseudonymous.",
    datingReasoning: [
      "If Pauline, Colossians is dated with Philemon and (usually) Ephesians to Paul's imprisonment, most often placed in Rome c. 60-62 AD, on largely the same reasoning used for Philippians and Ephesians.",
      "Scholars who see it as pseudonymous typically place it earlier than Ephesians (which many think used Colossians as a model), often in the 70s, closer to Paul's own lifetime than the later-dated Pastoral Epistles, reflecting the sense that whatever theological development it shows is comparatively modest relative to those clearly later disputed letters."
    ],
    placeOfWriting: "If genuine: Rome (or possibly Ephesus, on the same reasoning as Philippians)",
    audience: "The church at Colossae, in the Lycus Valley of Asia Minor, apparently facing pressure from a philosophical/ascetic teaching Paul considered a threat to Christ's sufficiency",
    summary: "A letter combating an early syncretistic teaching that mixed Jewish practice, asceticism, and speculation about angelic 'powers,' by insisting on Christ's supreme, all-sufficient cosmic lordship.",
    description: "Colossians opens with an exalted hymn-like passage on Christ as the image of the invisible God and head of creation, warns against 'hollow and deceptive philosophy' involving dietary rules, festival observance, and worship of angels, and, like Ephesians, closes with household instructions for wives and husbands, children and parents, and slaves and masters.",
    keyThemes: ["Christ's cosmic supremacy", "warning against syncretism", "the church as Christ's body", "household relationships", "union with Christ"],
    relatedBooks: ["bk_ephesians", "bk_philemon"],
    tags: ["epistle", "pauline", "disputed"],
    sources: ["Douglas J. Moo, The Letters to the Colossians and to Philemon (Pillar NT Commentary)", "Margaret Y. MacDonald, Colossians and Ephesians (Sacra Pagina)"]
  },
  {
    id: "bk_1thessalonians", name: "1 Thessalonians", fullTitle: "Paul's First Letter to the Thessalonians",
    canonicalOrder: 13, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 49, endYear: 51, importance: 6,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters, and by most reckonings the earliest surviving Christian document of any kind.",
    authorshipReasoning: [
      "1 Thessalonians is accepted as genuinely Pauline without meaningful dispute, matching Paul's style, vocabulary, and the situation described in Acts 17 (Paul's brief, disrupted founding visit to Thessalonica). Its concerns — reassuring a young, anxious congregation, defending Paul's conduct against apparent criticism, and addressing confusion about what happens to believers who die before Christ's return — read as an authentic, situational response rather than a later composite or imitation.",
      "Its comparatively simple theology, relative to Paul's later, more developed letters like Romans, is often cited as consistent with it being one of his earliest surviving pieces of correspondence, written not long after he founded the church it addresses."
    ],
    datingSummary: "Widely regarded as Paul's earliest surviving letter and the earliest document in the New Testament, c. 49-51 AD.",
    datingReasoning: [
      "1 Thessalonians is usually anchored to the famous Gallio inscription, an inscription from Delphi naming Gallio as proconsul of Achaia that fixes Paul's time in Corinth (Acts 18, where Paul wrote this letter after Timothy rejoined him, cf. 1 Thessalonians 3:6) to around 51-52 AD — one of the very few points where New Testament chronology intersects datable, external Roman administrative history.",
      "Because the letter reflects a very recent founding visit to Thessalonica and shows no awareness of the more developed controversies (over the Jewish law, for instance) that dominate Paul's later letters, nearly all scholars regard it as his earliest, or among his earliest, surviving letters, typically dated 49-51 AD."
    ],
    placeOfWriting: "Corinth",
    audience: "The young church at Thessalonica, founded by Paul shortly before writing and already facing persecution",
    summary: "Paul's warm, pastoral follow-up to a young congregation he had to leave abruptly, reassuring them about their faithfulness under persecution and clarifying confusion about the fate of believers who had already died before Christ's return.",
    description: "Paul recalls his brief, affectionate founding visit and expresses relief at Timothy's good report of the church's perseverance under persecution, before addressing a specific pastoral concern: some Thessalonians worried that believers who had died would miss out on Christ's return, which Paul answers with an account of the resurrection of the dead and the Lord's coming ('the Rapture' passage, 4:13-18), urging watchfulness rather than speculation about timing.",
    keyThemes: ["the second coming of Christ", "comfort for the grieving", "perseverance under persecution", "sexual and ethical holiness", "watchfulness"],
    relatedBooks: ["bk_2thessalonians", "bk_acts"],
    tags: ["epistle", "pauline"],
    sources: ["Charles A. Wanamaker, The Epistles to the Thessalonians (NIGTC)", "Abraham J. Malherbe, The Letters to the Thessalonians (Anchor Bible)"]
  },
  {
    id: "bk_2thessalonians", name: "2 Thessalonians", fullTitle: "Paul's Second Letter to the Thessalonians",
    canonicalOrder: 14, category: "Pauline-Disputed", testament: "New Testament",
    startYear: 51, endYear: 90, importance: 4,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally Paul, written shortly after 1 Thessalonians; a significant minority of critical scholars consider it pseudonymous, citing its differing tone and eschatology.",
    authorshipReasoning: [
      "2 Thessalonians presents itself as Paul's letter and closes with an explicit claim that Paul's own handwritten signature authenticates it against forgeries ('I, Paul, write this greeting with my own hand. This is the mark in every letter of mine,' 3:17) — a striking statement some read as straightforward evidence of authenticity, and others read (more suspiciously) as precisely the kind of protest a forger might insert to preempt doubt.",
      "The minority who doubt Pauline authorship point to its markedly different, more developed and systematic teaching about 'the man of lawlessness' and end-times events (2:1-12) compared to 1 Thessalonians's more open-ended exhortation to watchfulness, along with a formal, less personal tone; some also find it odd for Paul to write two such similar letters to the same church in close succession. The majority of scholars, including many critical ones, still accept Pauline authorship, noting that a different topic (correcting a specific over-realized end-times panic) plausibly explains the differences, and that the external evidence for the letter's authenticity in the early church is strong and largely unquestioned until modern scholarship."
    ],
    datingSummary: "c. 51-52 AD if genuinely by Paul, shortly after 1 Thessalonians; c. 80-100 AD if pseudonymous, as a minority of scholars hold.",
    datingReasoning: [
      "If authentic, 2 Thessalonians is dated immediately after 1 Thessalonians on the same Corinthian/Gallio-inscription grounds, since it addresses a related but more specific crisis (apparently some Thessalonians believed 'the day of the Lord' had already come, 2:2) that would naturally follow soon after the first letter.",
      "Scholars who consider it pseudonymous typically place it considerably later, sometime between 80-100 AD, treating its more systematized apocalyptic teaching as reflecting a later stage of Christian eschatological reflection, possibly written to correct or supplement how 1 Thessalonians was being read by a later generation."
    ],
    placeOfWriting: "If genuine: Corinth, shortly after 1 Thessalonians",
    audience: "The Thessalonian church, apparently confused or alarmed by claims that the Day of the Lord had already arrived",
    summary: "A follow-up letter correcting the belief that Christ's return had already happened, describing a 'man of lawlessness' who must first be revealed, and urging the congregation back to steady, orderly work and life.",
    description: "Paul reassures the Thessalonians amid persecution that God's justice will ultimately prevail, corrects the apparent claim that the Day of the Lord had already come by describing a coming 'rebellion' and 'man of lawlessness' who must appear first, and closes with a firm exhortation against idleness, including the famous instruction that 'the one who is unwilling to work shall not eat.'",
    keyThemes: ["the 'man of lawlessness'", "correcting eschatological confusion", "God's justice", "discipline and orderly living"],
    relatedBooks: ["bk_1thessalonians"],
    tags: ["epistle", "pauline", "disputed"],
    sources: ["Charles A. Wanamaker, The Epistles to the Thessalonians (NIGTC)", "Bart D. Ehrman, Forged: Writing in the Name of God (2011)"]
  },
  {
    id: "bk_1timothy", name: "1 Timothy", fullTitle: "Paul's First Letter to Timothy",
    canonicalOrder: 15, category: "Pastoral", testament: "New Testament",
    startYear: 62, endYear: 140, importance: 5,
    traditionalAuthor: "The Apostle Paul, writing to his younger colleague Timothy",
    authorshipConsensus: "Majority Critical",
    authorshipSummary: "Traditionally Paul; the majority of critical scholars consider 1 Timothy (along with 2 Timothy and Titus, collectively 'the Pastoral Epistles') pseudonymous, written a generation or more after Paul's death.",
    authorshipReasoning: [
      "The Pastoral Epistles claim Pauline authorship and were accepted as such through most of church history, addressed to Paul's real, named colleagues Timothy and Titus with instructions about church leadership and sound doctrine.",
      "Since the nineteenth century, a majority of critical scholars have concluded the Pastorals were not written by Paul, on several converging grounds: their vocabulary and style differ substantially from the undisputed Pauline letters (a very high proportion of words appear nowhere else in Paul); they describe a more formalized, hierarchical church structure (with qualifications for 'bishops'/overseers, elders, and deacons) that many see as reflecting a later, more institutionalized stage of church development than Paul's own lifetime; and they combat a form of false teaching that some scholars associate with developed forms of Gnosticism from the early-to-mid second century. A substantial minority — particularly conservative and evangelical scholars — continue to defend Pauline authorship, arguing the differences are explainable by different subject matter (church administration rather than theological controversy), a different secretary/amanuensis, Paul's advancing age, or an otherwise unattested later period of Paul's ministry after a release from Roman imprisonment (implied, on this view, by 2 Timothy and by an early tradition in 1 Clement that Paul reached 'the limits of the West,' i.e., Spain)."
    ],
    datingSummary: "c. 62-67 AD if genuinely Pauline, from a later period of his ministry; c. 100-140 AD if pseudonymous, as most critical scholars hold — making the Pastorals, on that view, among the latest-written documents in the New Testament.",
    datingReasoning: [
      "If Pauline, 1 Timothy is usually placed in a hypothesized period after Paul's Roman imprisonment described at the end of Acts, in the mid-to-late 60s, on the theory that he was released, continued traveling and ministering (including to Timothy at Ephesus), and was arrested again before his traditional death under Nero.",
      "Scholars who regard the letter as pseudonymous typically date it considerably later — often 100-140 AD — pointing to its concern with combating developed heretical teaching, its assumption of settled, multi-tiered church offices, and its use of language and concepts (like 'guarding what has been entrusted,' i.e. a fixed body of received doctrine) that they associate with the early-to-mid second-century church rather than Paul's own generation."
    ],
    placeOfWriting: "If genuine: Macedonia. If pseudonymous: unknown",
    audience: "Timothy, Paul's protégé and delegate at Ephesus (in the letter's narrative setting)",
    summary: "Practical instructions for church leadership and order at Ephesus — qualifications for overseers and deacons, guidance on worship and widows' care, and repeated warnings against false teachers.",
    description: "1 Timothy addresses public worship and prayer, sets out qualifications for church overseers ('bishops') and deacons, gives guidance on caring for widows and honoring elders, and repeatedly warns against false teaching, closing with an exhortation to Timothy to 'fight the good fight' and guard 'what has been entrusted to you.'",
    keyThemes: ["church leadership qualifications", "sound doctrine versus false teaching", "orderly worship", "care for widows", "godliness"],
    relatedBooks: ["bk_2timothy", "bk_titus"],
    tags: ["epistle", "pastoral", "disputed"],
    sources: ["I. Howard Marshall, The Pastoral Epistles (ICC)", "Bart D. Ehrman, Forged: Writing in the Name of God (2011)", "William D. Mounce, Pastoral Epistles (Word Biblical Commentary)"]
  },
  {
    id: "bk_2timothy", name: "2 Timothy", fullTitle: "Paul's Second Letter to Timothy",
    canonicalOrder: 16, category: "Pastoral", testament: "New Testament",
    startYear: 64, endYear: 140, importance: 5,
    traditionalAuthor: "The Apostle Paul, writing what tradition holds to be his final letter before execution",
    authorshipConsensus: "Majority Critical",
    authorshipSummary: "Traditionally Paul's final letter, written awaiting execution in Rome; grouped by most critical scholars with 1 Timothy and Titus as pseudonymous, though 2 Timothy's unusually personal, valedictory tone leads even some critical scholars to treat it somewhat differently from the other two Pastorals.",
    authorshipReasoning: [
      "2 Timothy shares the same authorship debate as 1 Timothy and Titus (see that entry for the general case for and against Pauline authorship of the Pastoral group), but is distinctive within the group for its unusually personal, emotionally direct content — Paul reminiscing about Timothy's mother and grandmother, requesting his cloak and books be brought to him, naming individuals who abandoned or stood by him — which some scholars, even among those who doubt 1 Timothy and Titus, find harder to dismiss as pure invention and occasionally argue may incorporate genuine fragments of Paul's actual final correspondence, reworked by a later editor into its current form.",
      "Traditionalists read this same personal detail as straightforward evidence that 2 Timothy is exactly what it claims to be: a genuine, deeply personal farewell letter from Paul, imprisoned and expecting death, to his closest protégé."
    ],
    datingSummary: "c. 64-67 AD if genuinely Paul's final letter; c. 100-140 AD if pseudonymous, on the same grounds as 1 Timothy and Titus.",
    datingReasoning: [
      "If genuine, 2 Timothy is traditionally dated to Paul's final imprisonment in Rome, shortly before his execution under Nero (traditionally dated c. 64-68 AD), distinguished from the earlier 'Prison Epistles' by its far bleaker tone — Paul expects to die, not to be released ('I am already being poured out as a libation,' 4:6).",
      "Scholars who see it as pseudonymous generally group it with 1 Timothy and Titus in the early-to-mid second century, though (per the note on its personal material above) some allow that it may be earlier than the other two Pastorals, or may incorporate an authentic Pauline fragment from around the time of his death."
    ],
    placeOfWriting: "If genuine: Rome, during Paul's final imprisonment",
    audience: "Timothy, urged to come quickly and to remain faithful amid Paul's impending death",
    summary: "A personal, valedictory letter in which Paul, expecting execution, urges Timothy to remain faithful to sound teaching, to endure hardship, and to carry on the ministry after his death.",
    description: "2 Timothy opens with personal reminiscence of Timothy's family faith, urges him to 'fan into flame the gift of God' and not be ashamed of the gospel, warns of difficult times and false teachers to come, and closes with Paul's famous reflection that he has 'fought the good fight, finished the race, kept the faith,' along with practical requests (his cloak, his books) and personal notes about companions who had abandoned or remained with him.",
    keyThemes: ["faithfulness amid suffering", "guarding sound doctrine", "perseverance", "Paul's approaching death", "passing on ministry to the next generation"],
    relatedBooks: ["bk_1timothy", "bk_titus"],
    tags: ["epistle", "pastoral", "disputed"],
    sources: ["I. Howard Marshall, The Pastoral Epistles (ICC)", "Luke Timothy Johnson, The First and Second Letters to Timothy (Anchor Bible)"]
  },
  {
    id: "bk_titus", name: "Titus", fullTitle: "Paul's Letter to Titus",
    canonicalOrder: 17, category: "Pastoral", testament: "New Testament",
    startYear: 62, endYear: 140, importance: 4,
    traditionalAuthor: "The Apostle Paul, writing to his colleague Titus on Crete",
    authorshipConsensus: "Majority Critical",
    authorshipSummary: "Shares the authorship debate of the other Pastoral Epistles — traditionally Paul; most critical scholars consider it pseudonymous.",
    authorshipReasoning: [
      "See 1 Timothy's entry for the general case for and against Pauline authorship of the Pastoral Epistles as a group; Titus shares essentially the same vocabulary, style, and church-structure concerns that drive the majority critical view, and the same personal/situational details (Titus's ministry organizing churches on Crete) that traditionalists cite in its favor.",
      "Titus is sometimes treated as the earliest-composed of the three Pastorals by scholars who accept a late, pseudonymous origin for the group, on the grounds that its description of church organization is somewhat less developed than 1 Timothy's, though this is a fine distinction within an already-debated theory rather than a point of wide agreement."
    ],
    datingSummary: "c. 62-67 AD if genuinely Pauline; c. 100-140 AD if pseudonymous, on the same grounds as 1 Timothy.",
    datingReasoning: [
      "If genuine, Titus is placed in the same hypothesized post-Acts period of Paul's ministry as 1 Timothy, after a possible release from his first Roman imprisonment, during which he left Titus to organize the churches on Crete (Titus 1:5).",
      "Scholars who regard it as pseudonymous date it alongside 1 Timothy and 2 Timothy, generally in the early-to-mid second century, on the same stylistic and ecclesiological grounds discussed under 1 Timothy."
    ],
    placeOfWriting: "If genuine: Macedonia or Nicopolis",
    audience: "Titus, left by Paul to organize and appoint leaders for the churches on Crete",
    summary: "Instructions for organizing the young churches of Crete — qualifications for elders, guidance for different groups within the church, and an emphasis on good works flowing from grace.",
    description: "Titus sets out qualifications for appointing elders, addresses instructions to older and younger men and women and to slaves, and grounds Christian ethical living in God's grace ('the grace of God has appeared, bringing salvation to all... training us to renounce ungodliness'), closing with practical greetings and travel plans.",
    keyThemes: ["church leadership qualifications", "grace producing good works", "sound doctrine", "household and social relationships"],
    relatedBooks: ["bk_1timothy", "bk_2timothy"],
    tags: ["epistle", "pastoral", "disputed"],
    sources: ["I. Howard Marshall, The Pastoral Epistles (ICC)", "William D. Mounce, Pastoral Epistles (Word Biblical Commentary)"]
  },
  {
    id: "bk_philemon", name: "Philemon", fullTitle: "Paul's Letter to Philemon",
    canonicalOrder: 18, category: "Pauline-Undisputed", testament: "New Testament",
    startYear: 54, endYear: 62, importance: 3,
    traditionalAuthor: "The Apostle Paul",
    authorshipConsensus: "Undisputed",
    authorshipSummary: "One of the seven undisputed Pauline letters — the shortest and most personal.",
    authorshipReasoning: [
      "Philemon's authenticity is effectively unquestioned: it is a brief, intensely personal private letter about a specific individual (Onesimus, a slave who had apparently run away from his owner Philemon and encountered Paul, possibly in prison), with none of the generalized theological argument that might invite suspicion of later imitation.",
      "Its close ties to Colossians — naming several of the same people (Onesimus, Archippus, Epaphras, Mark, Aristarchus, Demas, Luke) in the same setting — are widely cited as mutually reinforcing evidence for the authenticity and shared context of both letters, whatever view one takes of Colossians's own authorship debate."
    ],
    datingSummary: "Dated alongside Colossians, most often c. 60-62 AD during a Roman imprisonment, though (like Philippians) an earlier Ephesian imprisonment remains a minority possibility.",
    datingReasoning: [
      "Paul writes as a prisoner (Philemon 1, 9, 23) and sends the letter, like Colossians, via Tychicus and the returning Onesimus, which places its composition at the same time and location as Colossians — whichever imprisonment (Roman or, on the minority view, Ephesian) is favored for that letter.",
      "Because Philemon is universally accepted as authentic and closely tied to Colossians's setting, its own date largely rides on the wider Colossians dating debate rather than having independent evidence of its own."
    ],
    placeOfWriting: "If Roman imprisonment: Rome. If Ephesian: Ephesus",
    audience: "Philemon, a Christian slaveowner and friend of Paul, regarding his runaway slave Onesimus",
    summary: "A brief, delicate personal appeal from Paul asking Philemon to receive back his runaway slave Onesimus — who had since become a Christian and useful to Paul — 'no longer as a slave, but... as a dear brother.'",
    description: "Paul writes on behalf of Onesimus, sending him back to Philemon while diplomatically appealing for mercy and even suggesting (without directly commanding) that Philemon might free him, offering to personally cover any debt Onesimus owes. The letter has been read very differently across history: as a text implicitly undermining slavery's legitimacy, and, notoriously, as one historically misused to defend the institution.",
    keyThemes: ["reconciliation", "Christian siblinghood across social status", "grace and appeal rather than command", "slavery in the ancient world"],
    relatedBooks: ["bk_colossians", "bk_ephesians"],
    tags: ["epistle", "pauline"],
    sources: ["John M.G. Barclay, Colossians and Philemon", "Douglas J. Moo, The Letters to the Colossians and to Philemon (Pillar NT Commentary)"]
  },
  {
    id: "bk_hebrews", name: "Hebrews", fullTitle: "The Letter to the Hebrews",
    canonicalOrder: 19, category: "General", testament: "New Testament",
    startYear: 60, endYear: 95, importance: 7,
    traditionalAuthor: "Unknown; variously guessed as Paul, Barnabas, Apollos, or Priscilla, among others",
    authorshipConsensus: "Anonymous",
    authorshipSummary: "The text itself names no author, and no guess has ever won broad consensus; even the early church was divided, with Origen famously concluding 'only God knows' who wrote it.",
    authorshipReasoning: [
      "Hebrews is formally anonymous — unlike Paul's letters, it has no opening salutation naming a sender, and reads more like a sermon or theological essay than a letter until its closing verses. Some early Christians, particularly in the Eastern church, associated it with Paul, and it was sometimes copied alongside his letters, but this attribution was contested from very early on: the church father Origen (early third century) reviewed various theories and concluded that 'who wrote the epistle, God certainly knows,' a judgment often quoted as a model of appropriate scholarly caution that still holds today.",
      "Its Greek style, vocabulary, and method of argument (dense, sermon-like exposition of Old Testament texts, especially about priesthood and sacrifice) differ substantially from Paul's undisputed letters, which is why Pauline authorship has been widely abandoned even among more traditional scholars. Other proposed authors — Barnabas (suggested by Tertullian), Apollos (a guess favored by Martin Luther, on the strength of Apollos's description in Acts 18:24 as 'eloquent' and skilled with Scripture), Silas, Priscilla (proposed partly to explain the author's careful avoidance of self-identifying gender markers), and others — remain speculative, and no single candidate has majority support. Most modern scholars are content to leave the author unidentified."
    ],
    datingSummary: "Uncertain; most estimates fall between c. 60-95 AD, constrained by its use in 1 Clement (c. 95-96 AD) as an outer limit and, for many scholars, its complete silence about the Temple's destruction as an argument for a date before 70 AD.",
    datingReasoning: [
      "Hebrews discusses the Levitical sacrificial system and priesthood extensively in the present tense, and never mentions the Jerusalem Temple's destruction in 70 AD — an omission many scholars find significant, since an argument so focused on the obsolescence of the old sacrificial system would be a natural place to mention that the Temple itself had already been destroyed, if it had been. This leads a substantial number of scholars to date it before 70 AD, though others caution that an author could simply be discussing the sacrificial system as described in Scripture (the Torah) without needing to reference the Temple's contemporary status.",
      "The letter is quoted (without attribution) by 1 Clement, a Roman Christian letter usually dated c. 95-96 AD, which sets a firm outer limit. Between these bookends, scholars' estimates vary considerably depending on how they read the internal evidence, with many settling on a range across the 60s to 80s AD."
    ],
    placeOfWriting: "Unknown",
    audience: "A Jewish-Christian community, possibly considering a return to Judaism under pressure or persecution",
    summary: "A sustained sermon-like argument for Christ's superiority to angels, Moses, and the Levitical priesthood, urging a wavering community not to abandon their faith, interwoven with warnings and one of the Bible's most famous meditations on faith (chapter 11).",
    description: "Hebrews opens with a majestic statement of Christ's supremacy over the angels and unfolds an extended argument, built on close reading of Old Testament texts, that Jesus is a superior high priest whose once-for-all sacrifice fulfills and surpasses the entire Levitical sacrificial system. It is punctuated by severe warnings against 'falling away' and, in chapter 11, a celebrated roll call of Old Testament figures commended for their faith.",
    keyThemes: ["Christ's superior priesthood", "the new covenant surpassing the old", "faith", "perseverance amid persecution", "warning against apostasy"],
    relatedBooks: [],
    tags: ["epistle", "general"],
    sources: ["Harold W. Attridge, The Epistle to the Hebrews (Hermeneia)", "Craig R. Koester, Hebrews (Anchor Bible)", "Origen, quoted in Eusebius, Ecclesiastical History"]
  },
  {
    id: "bk_james", name: "James", fullTitle: "The Letter of James",
    canonicalOrder: 20, category: "General", testament: "New Testament",
    startYear: 45, endYear: 120, importance: 6,
    traditionalAuthor: "James, 'the brother of the Lord,' leader of the Jerusalem church",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally James, Jesus's brother and leader of the Jerusalem church; a considerable number of critical scholars see it as pseudonymous, citing its polished Greek, though this is contested.",
    authorshipReasoning: [
      "The letter identifies its author simply as 'James, a servant of God and of the Lord Jesus Christ' (1:1), which the early church generally understood to mean James the brother of Jesus, described in Acts and Paul's letters (Galatians 1:19, 2:9) as the leader of the Jerusalem church and known from Josephus to have been executed c. 62 AD.",
      "Scholars who doubt this attribution point to the letter's fluent, rhetorically polished Greek (including sophisticated wordplay), which they consider surprising for a Galilean craftsman's family, and to its lack of any direct reference to Jesus's earthly life or unique authority as his brother, despite the obvious rhetorical opportunity. Those who defend the traditional attribution respond that Galilee was more thoroughly Hellenized and bilingual than sometimes assumed, that a scribe/secretary could easily account for polished Greek, and that the letter's content — deeply rooted in Jewish wisdom tradition and echoing Jesus's own teaching (especially the Sermon on the Mount) without directly quoting it — is exactly what would be expected from someone who knew that teaching first-hand rather than from written Gospels."
    ],
    datingSummary: "One of the widest date ranges in the New Testament: as early as the mid-40s AD if genuinely by James (making it potentially the earliest NT document), or as late as c. 120 AD if pseudonymous.",
    datingReasoning: [
      "If James the brother of Jesus wrote it, the letter must predate his death (c. 62 AD per Josephus), and some scholars — noting its simple, undeveloped organizational structure with no mention of the controversies (like circumcision of Gentiles) that dominated the church from the late 40s onward — argue for an unusually early date, even the mid-40s, which would make it earlier than any of Paul's letters.",
      "Scholars who consider it pseudonymous point to its apparent familiarity with (or independent parallel to) Pauline vocabulary about 'faith' and 'works' (2:14-26, often read as responding to a simplified version of Paul's teaching after his letters had circulated) and its concern with wealth and poverty fitting a later social setting, and typically date it anywhere from the 80s to as late as 120 AD."
    ],
    placeOfWriting: "If genuine: Jerusalem",
    audience: "'The twelve tribes scattered among the nations' — likely Jewish Christians dispersed outside Palestine",
    summary: "A practical, wisdom-tradition-infused letter insisting that genuine faith produces visible good works, with sharp warnings against favoritism toward the rich, uncontrolled speech, and worldly ambition.",
    description: "James reads more like Jewish wisdom literature (echoing Proverbs and, many scholars note, Jesus's own teaching in the Sermon on the Mount) than a typical letter, moving rapidly between practical topics: enduring trials, controlling the tongue, favoritism toward wealthy visitors, the relationship between faith and works ('faith without works is dead'), and prayer for the sick.",
    keyThemes: ["faith demonstrated by works", "care for the poor", "controlling speech", "resisting worldliness", "patient endurance"],
    relatedBooks: [],
    tags: ["epistle", "general", "wisdom"],
    sources: ["Luke Timothy Johnson, The Letter of James (Anchor Bible)", "Dale C. Allison Jr., James (ICC)"]
  },
  {
    id: "bk_1peter", name: "1 Peter", fullTitle: "Peter's First Letter",
    canonicalOrder: 21, category: "General", testament: "New Testament",
    startYear: 60, endYear: 95, importance: 6,
    traditionalAuthor: "The Apostle Peter",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally Peter, possibly with the help of a secretary (Silvanus/Silas); many critical scholars doubt direct Petrine authorship given the letter's polished Greek and apparent awareness of later, wider persecution.",
    authorshipReasoning: [
      "1 Peter identifies its author as 'Peter, an apostle of Jesus Christ' (1:1) and closes with a note that it was written 'through Silvanus' (5:12) — traditionally understood as Peter dictating to, or having his Greek polished by, a secretary, which would help explain the letter's notably sophisticated Greek style, a level of fluency that seems surprising for a Galilean fisherman writing in what was presumably not his first language.",
      "Scholars who doubt direct Petrine authorship cite that same polished Greek (even accounting for a secretary), close literary parallels to some of Paul's letters (suggesting familiarity with a collected Pauline corpus, which took time to assemble), and a description of persecution (4:12-16, being reproached 'for the name of Christ') that some read as reflecting a more organized, empire-wide hostility toward Christians than existed in Peter's likely lifetime (he died c. 64-68 AD, before Rome's persecutions became systematically empire-wide). Traditionalists respond that localized harassment and social ostracism of Christians is well attested even in the 60s, that the 'through Silvanus' note directly addresses the style question, and that the letter's specific greetings and personal references (to 'Mark, my son,' 5:13) support genuine Petrine origin."
    ],
    datingSummary: "c. 62-65 AD if genuinely Peter's (shortly before his traditional death); c. 70-95 AD if written later in his name, as many critical scholars hold.",
    datingReasoning: [
      "If genuine, 1 Peter is usually dated to the early-to-mid 60s, before Peter's traditional death under Nero (c. 64-68 AD), consistent with a letter written from 'Babylon' (5:13), widely understood as a coded reference to Rome, during the early stirrings of persecution there.",
      "Scholars who doubt Petrine authorship, or who think a secretary had very substantial compositional freedom after Peter's death, typically date it to the 70s-90s, associating its description of suffering 'for the name' with slightly later, more institutionalized friction between Christians and Roman authorities (sometimes compared to the situation described a few decades later in Pliny the Younger's correspondence with Trajan, c. 112 AD, though most scholars stop short of dating 1 Peter that late)."
    ],
    placeOfWriting: "'Babylon' (5:13), understood as a cipher for Rome",
    audience: "Christians scattered across Asia Minor (Pontus, Galatia, Cappadocia, Asia, Bithynia), facing social hostility and suffering for their faith",
    summary: "A letter encouraging Christians facing hostility and suffering to hold firm, live honorably among a suspicious society, and follow Christ's own pattern of suffering unjustly.",
    description: "1 Peter frames Christian identity around being 'elect exiles,' urges submission to governing authorities and honorable conduct even under unjust suffering, holds up Christ's own suffering as a pattern to imitate, and gives household instructions (particularly extensive guidance for wives with non-believing husbands), closing with encouragement to 'stand firm' against the devil, described as 'a roaring lion.'",
    keyThemes: ["suffering for righteousness", "Christian identity as 'exiles'", "submission to authority", "Christ's example of suffering", "hope amid hostility"],
    relatedBooks: ["bk_2peter"],
    tags: ["epistle", "general"],
    sources: ["John H. Elliott, 1 Peter (Anchor Bible)", "Paul J. Achtemeier, 1 Peter (Hermeneia)"]
  },
  {
    id: "bk_2peter", name: "2 Peter", fullTitle: "Peter's Second Letter",
    canonicalOrder: 22, category: "General", testament: "New Testament",
    startYear: 64, endYear: 150, importance: 5,
    traditionalAuthor: "The Apostle Peter",
    authorshipConsensus: "Majority Critical",
    authorshipSummary: "Traditionally Peter's final letter; widely regarded, even by many otherwise traditional scholars, as the New Testament book with the weakest claim to its traditional attribution, and often considered the latest-written document in the New Testament.",
    authorshipReasoning: [
      "2 Peter claims to be written by 'Simeon Peter' (1:1) as his own testament shortly before death (1:14), and was defended as Petrine by parts of the early church, though notably it was among the last books to be widely accepted into the New Testament canon, with even ancient authorities like Eusebius and Jerome noting persistent doubts about it in their own time.",
      "The scholarly case against Petrine authorship is unusually strong and broadly held: 2 Peter's Greek style differs sharply from 1 Peter's (making common authorship of both letters difficult even for those who accept 1 Peter as genuine); large portions of chapter 2 closely parallel the Letter of Jude, which most scholars think 2 Peter used as a source (implying 2 Peter postdates Jude); it refers to Paul's letters as an already-collected body of writings treated as 'Scripture' alongside 'the other scriptures' (3:15-16), implying a time when Paul's letters had been gathered and were being read as authoritative Scripture, a process that took decades; and it responds to skepticism about a delayed second coming ('where is the promise of his coming?', 3:4) in a way many read as reflecting a generation grappling with unfulfilled expectations after the first eyewitnesses had already died. Because of this unusually convergent evidence, a very wide range of scholars — not just skeptical critics but many mainstream and even some evangelical scholars — treat 2 Peter as pseudonymous, while others maintain the traditional attribution is still defensible, particularly if a secretary or later editor is allowed significant involvement."
    ],
    datingSummary: "If genuine, c. 64-68 AD, just before Peter's death; if pseudonymous, as most scholars hold, likely c. 100-150 AD, plausibly the latest-written book in the New Testament.",
    datingReasoning: [
      "A traditional dating places 2 Peter right at the end of Peter's life, in the mid-to-late 60s, as his final testament (echoing 2 Timothy's similar 'farewell' genre for Paul).",
      "The majority critical dating, resting on 2 Peter's use of Jude, its treatment of Paul's letters as a collected, authoritative 'Scripture,' and its engagement with organized skepticism about the second coming, places it considerably later — commonly in the first half of the second century (roughly 100-150 AD) — which would make it, on this view, the last New Testament document to be written, decades after every other book."
    ],
    placeOfWriting: "Unknown",
    audience: "A general Christian audience facing false teachers and skepticism about Christ's return",
    summary: "A letter warning against false teachers who exploit believers and mock the promise of Christ's return, urging perseverance in true knowledge and virtue while awaiting 'a new heaven and a new earth.'",
    description: "2 Peter opens by grounding its authority in eyewitness testimony of Jesus's transfiguration, devotes its middle chapter (closely paralleling Jude) to a scathing denunciation of false teachers, and closes by defending the reality of Christ's still-future return against scoffers, memorably noting that 'with the Lord a day is like a thousand years,' before urging holy living in anticipation of a renewed creation.",
    keyThemes: ["false teachers", "the delay of Christ's return", "growth in knowledge and virtue", "eyewitness authority", "cosmic renewal"],
    relatedBooks: ["bk_1peter", "bk_jude"],
    tags: ["epistle", "general", "disputed"],
    sources: ["Richard Bauckham, Jude, 2 Peter (Word Biblical Commentary)", "Bart D. Ehrman, Forged: Writing in the Name of God (2011)"]
  },
  {
    id: "bk_1john", name: "1 John", fullTitle: "The First Letter of John",
    canonicalOrder: 23, category: "General", testament: "New Testament",
    startYear: 90, endYear: 100, importance: 6,
    traditionalAuthor: "The Apostle John, also credited with the Gospel of John",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "Traditionally the Apostle John; the letter's close linguistic and theological kinship with the Gospel of John is undisputed, though scholars debate whether they share a literal single author or a shared 'Johannine' community/tradition.",
    authorshipReasoning: [
      "1 John is formally anonymous (it never names an author) but shares such extensive, distinctive vocabulary and theology with the Gospel of John — light versus darkness, love, abiding, the contrast of truth and lie, similar sentence rhythms — that virtually all scholars agree it comes from the same broad circle, commonly called the 'Johannine community' or school.",
      "Whether that circle's founding authority was, specifically, John the son of Zebedee, or a different, less prominent 'John' (see the Gospel of John's entry on 'John the Elder'), or an anonymous tradition later associated with John, remains debated in the same way as the Gospel's own authorship; the church's early, strong tradition (Irenaeus, again citing his connection through Polycarp to John) supports the traditional attribution, which a majority of scholars still find the most economical explanation even if they hold it with less certainty than they would for an undisputed Pauline letter."
    ],
    datingSummary: "Usually dated close to the Gospel of John, c. 90-100 AD.",
    datingReasoning: [
      "1 John's close relationship to the Gospel of John (whether written by the same hand or drawing on shared community tradition and vocabulary) leads most scholars to place it in a similar period, and its concern with internal division — countering a group that had 'gone out from us' with a docetic-leaning denial that Jesus 'came in the flesh' (4:2-3) — is often read as reflecting a controversy that developed within the Johannine community after the Gospel's own composition, suggesting 1 John is slightly later than, or roughly contemporary with, the Gospel's final form.",
      "No external evidence pins the date more precisely than 'the last decade of the first century, give or take,' which is why most treatments simply place it alongside the Gospel and the two short letters, 2 and 3 John."
    ],
    placeOfWriting: "Traditionally Ephesus, on the same grounds as the Gospel of John",
    audience: "A Johannine Christian community facing internal division over a group that had left, apparently denying Jesus's full humanity",
    summary: "A pastoral letter (more like a sermon than a typical letter, with no opening salutation) reassuring a community shaken by schism, insisting that genuine faith in Jesus Christ 'come in the flesh' shows itself in love for fellow believers and obedience to God's commands.",
    description: "1 John repeatedly tests genuine faith by two intertwined marks: right belief about Jesus (against a group denying he 'came in the flesh') and practical love for other believers ('whoever does not love does not know God, for God is love'), offering reassurance ('these things I have written... so that you may know that you have eternal life') to a community rattled by those who had departed.",
    keyThemes: ["love as the mark of true faith", "confessing Christ 'in the flesh'", "assurance of salvation", "walking in the light", "God is love"],
    relatedBooks: ["bk_john", "bk_2john", "bk_3john"],
    tags: ["epistle", "general", "johannine"],
    sources: ["Raymond E. Brown, The Epistles of John (Anchor Bible)", "Judith Lieu, I, II, & III John (NTL)"]
  },
  {
    id: "bk_2john", name: "2 John", fullTitle: "The Second Letter of John",
    canonicalOrder: 24, category: "General", testament: "New Testament",
    startYear: 90, endYear: 100, importance: 3,
    traditionalAuthor: "'The Elder,' traditionally identified with the Apostle John",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "The author calls himself only 'the Elder'; tradition identifies this with John the Apostle, though many scholars think it more likely refers to a known leader of the Johannine community distinct from, but closely tied to, the Gospel's tradition.",
    authorshipReasoning: [
      "Both 2 and 3 John identify their author simply as 'the Elder' (ho presbyteros) rather than by name, which is itself a piece of evidence scholars debate: it could be a modest self-reference by the Apostle John in old age, or it could indicate a different figure — possibly the 'John the Elder' mentioned by Papias as distinct from John the Apostle — who held recognized authority within the Johannine churches.",
      "Its close vocabulary and theological overlap with 1 John and the Gospel of John place it firmly within the same Johannine circle regardless of the precise individual behind 'the Elder,' which is why most scholars, including many who are agnostic about the exact identity, still broadly retain the traditional grouping with the other Johannine writings."
    ],
    datingSummary: "Dated alongside 1 John and 3 John, c. 90-100 AD.",
    datingReasoning: [
      "As a brief, occasional letter with almost no independently datable internal content, 2 John's date is inferred almost entirely from its close relationship to 1 John and the Johannine tradition generally, placing it in the same broad window, c. 90-100 AD.",
      "Its warning against traveling teachers who deny Christ 'come in the flesh' (verse 7) echoes 1 John's language closely enough that most scholars treat the two letters as addressing the same or a closely related controversy at roughly the same time."
    ],
    placeOfWriting: "Traditionally Ephesus or elsewhere in Asia Minor",
    audience: "'The elect lady and her children' — likely a local church addressed metaphorically as a woman and her congregation, rather than a literal individual",
    summary: "A brief letter urging continued love and truth, and warning against welcoming traveling teachers who deny that Jesus Christ came in the flesh.",
    description: "The shortest book in the New Testament by word count alongside 3 John, 2 John reiterates the command to love one another, warns against 'deceivers' denying Christ's incarnation, and instructs the recipients not to offer hospitality or greeting to such teachers, lest they share in their wrongdoing.",
    keyThemes: ["love and truth together", "warning against false teachers", "hospitality and its limits", "confessing Christ 'in the flesh'"],
    relatedBooks: ["bk_1john", "bk_3john"],
    tags: ["epistle", "general", "johannine"],
    sources: ["Raymond E. Brown, The Epistles of John (Anchor Bible)", "Judith Lieu, I, II, & III John (NTL)"]
  },
  {
    id: "bk_3john", name: "3 John", fullTitle: "The Third Letter of John",
    canonicalOrder: 25, category: "General", testament: "New Testament",
    startYear: 90, endYear: 100, importance: 3,
    traditionalAuthor: "'The Elder,' traditionally identified with the Apostle John",
    authorshipConsensus: "Majority Traditional",
    authorshipSummary: "Shares the same authorship discussion as 2 John — the author again calls himself only 'the Elder.'",
    authorshipReasoning: [
      "3 John is written by the same self-identified 'Elder' as 2 John, addressed this time to a named individual, Gaius, rather than a congregation, making it the most personal and specific of the three Johannine letters. The authorship discussion mirrors 2 John's in every respect (see that entry).",
      "Unlike 1 and 2 John, 3 John names other real individuals — Gaius, Diotrephes (criticized for refusing to welcome traveling missionaries and expelling those who did), and Demetrius — lending it an unusually concrete, small-scale, verifiable social setting that most scholars find hard to read as anything other than a genuine, occasional piece of correspondence from a real community leader, whoever exactly 'the Elder' was."
    ],
    datingSummary: "Dated alongside 1 and 2 John, c. 90-100 AD.",
    datingReasoning: [
      "As with 2 John, 3 John's date rests almost entirely on its association with the wider Johannine corpus rather than independently datable internal content, placing it in the same c. 90-100 AD window.",
      "Its narrower concern — a specific conflict over hospitality toward traveling missionaries and the authority of 'the Elder' versus a local leader named Diotrephes — is sometimes read as reflecting early tensions over centralized authority within emerging church networks, consistent with a late first-century setting."
    ],
    placeOfWriting: "Traditionally Ephesus or elsewhere in Asia Minor",
    audience: "Gaius, a Christian praised for his hospitality to traveling missionaries",
    summary: "A short personal letter commending Gaius for supporting traveling missionaries, criticizing a local leader named Diotrephes for refusing to do the same and for expelling those who did, and commending a third figure, Demetrius.",
    description: "The shortest book in the New Testament, 3 John is a personal note about a local dispute: Gaius is praised for welcoming itinerant Christian teachers, Diotrephes is condemned for self-aggrandizing refusal to cooperate with 'the Elder' and for putting out of the church those who showed hospitality, and Demetrius is commended as trustworthy, with a promise to discuss more in person soon.",
    keyThemes: ["hospitality to traveling missionaries", "conflict over church authority", "commendation and warning about specific individuals"],
    relatedBooks: ["bk_1john", "bk_2john"],
    tags: ["epistle", "general", "johannine"],
    sources: ["Raymond E. Brown, The Epistles of John (Anchor Bible)", "Judith Lieu, I, II, & III John (NTL)"]
  },
  {
    id: "bk_jude", name: "Jude", fullTitle: "The Letter of Jude",
    canonicalOrder: 26, category: "General", testament: "New Testament",
    startYear: 60, endYear: 90, importance: 4,
    traditionalAuthor: "Jude, 'a servant of Jesus Christ and brother of James' — traditionally understood as another brother of Jesus",
    authorshipConsensus: "Debated",
    authorshipSummary: "Traditionally Jude, brother of Jesus and James; some scholars question this given the letter's fluent Greek and use of extra-biblical Jewish texts, though the case is less one-sided than for the Pastorals or 2 Peter.",
    authorshipReasoning: [
      "The letter identifies its author as 'Jude... a brother of James' (verse 1), which early tradition connected to the Jude/Judas listed among Jesus's brothers (Mark 6:3) and to the James who led the Jerusalem church — notably, the author does not claim to be Jesus's brother directly, which some read as a mark of humility consistent with authenticity (a forger claiming this identity might be expected to emphasize the family connection to Jesus more directly), while others see the reticence differently.",
      "As with James, some scholars question authorship by a Galilean relative of Jesus given the letter's relatively fluent Greek and its confident use of Jewish apocalyptic and pseudepigraphal literature (quoting 1 Enoch directly as authoritative, and alluding to the Assumption of Moses), though others note this simply reflects the kind of popular Jewish literature that would have been familiar within Jesus's own family and social milieu, and doesn't require an especially sophisticated education to draw on."
    ],
    datingSummary: "Uncertain, roughly c. 60-90 AD, constrained mainly by its literary relationship to 2 Peter (which most scholars think used Jude as a source, meaning Jude must be earlier).",
    datingReasoning: [
      "The tightest, most-discussed piece of dating evidence is Jude's close literary relationship with 2 Peter 2, which reproduces large stretches of Jude's content and wording; the great majority of scholars conclude 2 Peter used Jude as a source (rather than the reverse, or both depending on a lost common source), which requires Jude to predate 2 Peter — itself usually dated anywhere from the mid-60s to the mid-second century, depending on one's view of 2 Peter's own authorship (see that entry).",
      "Beyond that relative sequencing, Jude gives few independently datable internal clues; scholars who accept traditional authorship by Jesus's brother place it before his likely death sometime in the second half of the first century, while those who see it as somewhat later, reflecting organized 'ungodly' false teachers infiltrating congregations, sometimes push toward the 80s."
    ],
    placeOfWriting: "Unknown",
    audience: "A general Christian audience facing infiltration by immoral, licentious false teachers",
    summary: "A short, urgent letter warning against false teachers who had 'crept in' among the community, using vivid Old Testament and Jewish tradition imagery to warn of coming judgment, and closing with one of the New Testament's best-known doxologies.",
    description: "Jude urges readers to 'contend for the faith' against infiltrating false teachers, marshals a rapid sequence of Old Testament and extra-biblical examples of judgment on the ungodly (the wilderness generation, fallen angels, Sodom and Gomorrah, Cain, Balaam, Korah), quotes the non-canonical book of 1 Enoch directly, and closes with a soaring doxology: 'to him who is able to keep you from stumbling...'",
    keyThemes: ["warning against false teachers", "judgment on the ungodly", "contending for the faith", "God's power to keep believers"],
    relatedBooks: ["bk_2peter"],
    tags: ["epistle", "general"],
    sources: ["Richard Bauckham, Jude, 2 Peter (Word Biblical Commentary)", "Gene L. Green, Jude and 2 Peter (Baker Exegetical Commentary)"]
  },
  {
    id: "bk_revelation", name: "Revelation", fullTitle: "The Revelation to John",
    canonicalOrder: 27, category: "Apocalyptic", testament: "New Testament",
    startYear: 64, endYear: 96, importance: 8,
    traditionalAuthor: "'John,' traditionally identified with the Apostle John, though this is one of the most debated identifications in the New Testament",
    authorshipConsensus: "Debated",
    authorshipSummary: "The author identifies himself only as 'John'; tradition identifies him with the Apostle, but the book's Greek style and theology differ so much from the Gospel and Letters of John that many scholars think a different person — sometimes called 'John of Patmos' — wrote it.",
    authorshipReasoning: [
      "Revelation's author names himself simply 'John' (1:1, 1:9, 22:8) and describes himself as a fellow-sufferer exiled on the island of Patmos, but never explicitly claims to be an apostle or the son of Zebedee. Early tradition (Justin Martyr, Irenaeus) identified him with the Apostle John, the same figure traditionally credited with the Gospel and Letters.",
      "This identification was already disputed in antiquity — the third-century bishop Dionysius of Alexandria argued from a detailed comparison of vocabulary, grammar, and style that Revelation's rough, Semitic-flavored Greek (sometimes described as deliberately violating standard Greek grammar for effect) was too different from the polished Greek of the Gospel and Letters of John to share a common author, a judgment many modern scholars share. Because of this, a substantial number of scholars — while still often calling the author 'John' out of respect for his self-identification — treat him as a distinct figure, sometimes labeled 'John of Patmos' or 'John the Seer,' someone deeply immersed in Jewish apocalyptic tradition and the Hebrew Bible, but probably not the same individual behind the Gospel of John."
    ],
    datingSummary: "Most commonly dated c. 95-96 AD, under the emperor Domitian; a significant minority favors an earlier date c. 64-70 AD, under Nero.",
    datingReasoning: [
      "The majority view rests heavily on the external testimony of Irenaeus (late second century), who states that the vision was seen 'toward the end of Domitian's reign' (who ruled until 96 AD), and on Revelation's depiction of organized emperor-worship and pressure to participate in it, which fits well with what's known about the imperial cult's growth in Asia Minor by the 90s.",
      "A significant minority — sometimes called the 'early date' or 'preterist-leaning' position — argues instead for composition under Nero, c. 64-70 AD, pointing to internal clues like Revelation 11's description of the Jerusalem Temple as if still standing (suggesting a date before its 70 AD destruction) and the famous number '666' (13:18), widely proposed by both ancient and modern interpreters as a numerical cipher (gematria) for 'Nero Caesar' when his name is transliterated into Hebrew letters and their numeric values summed. Scholars remain divided between these two main proposals, though the Domitianic date, resting on the earliest and most direct external testimony, remains the more widely cited default."
    ],
    placeOfWriting: "The island of Patmos, in the Aegean Sea, where the author says he was exiled",
    audience: "Seven churches in the Roman province of Asia (Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea), facing pressure to compromise with Roman imperial religion",
    summary: "An apocalyptic vision, addressed to seven churches under pressure to accommodate Roman imperial cult worship, unveiling cosmic conflict between God and evil through vivid, symbol-dense imagery, and culminating in a new heaven and new earth.",
    description: "Revelation opens with letters to seven churches praising and rebuking their specific situations, then unfolds a series of visions — seals, trumpets, and bowls of judgment; a woman clothed with the sun and a great dragon; two beasts (widely read as symbols of Roman imperial power and its cult); the fall of 'Babylon' (widely read as a cipher for Rome); and finally the defeat of evil, a final judgment, and a new Jerusalem descending from heaven, where 'God himself will be with them... and death shall be no more.'",
    keyThemes: ["cosmic conflict between God and evil", "faithful endurance under persecution", "critique of Roman imperial power", "final judgment", "new creation"],
    relatedBooks: ["bk_john"],
    tags: ["apocalyptic", "prophecy"],
    sources: ["David E. Aune, Revelation (Word Biblical Commentary)", "G.K. Beale, The Book of Revelation (NIGTC)", "Eusebius, Ecclesiastical History (quoting Irenaeus)"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BIBLE_BOOKS };
}
