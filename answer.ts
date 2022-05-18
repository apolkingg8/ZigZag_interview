import * as _ from "lodash";

const foo = (input: string[]): number => {
    // step 1: migrate into a matrix
    let grid: string[][] = []

    for(let str of input) {
        grid.push(str.split(''))
    }

    // step 2: find all rooms
    const findRoom = (xy: [number, number], roomGrids: number[][])=> {
        let [x, y] = xy
        let currentId = (grid[y] || [])[x]
        let upId = (grid[y-1] || [])[x]
        let downId = (grid[y+1] || [])[x]
        let leftId = (grid[y] || [])[x-1]
        let rightId = (grid[y] || [])[x+1]

        roomGrids.push([x, y])

        if(upId === currentId
        && !_.find(roomGrids, (g)=> (_.isEqual(g, [x, y-1])))) {
            findRoom([x, y-1], roomGrids)
        }
        if(downId === currentId
        && !_.find(roomGrids, (g)=> (_.isEqual(g, [x, y+1])))) {
            findRoom([x, y+1], roomGrids)
        }
        if(leftId === currentId
        && !_.find(roomGrids, (g)=> (_.isEqual(g, [x-1, y])))) {
            findRoom([x-1, y], roomGrids)
        }
        if(rightId === currentId
        && !_.find(roomGrids, (g)=> (_.isEqual(g, [x+1, y])))) {
            findRoom([x+1, y], roomGrids)
        }
    }

    let rooms: number[][][] = []

    for(let x=0; x<grid[0].length; x++) {
        for(let y=0; y<grid.length; y++) {
            let roomGrids: number[][] = []
            findRoom([x, y], roomGrids)
            rooms.push(roomGrids)
        }
    }

    rooms = _.uniqWith(rooms, (a, b)=> (_.isEqual(a.sort(), b.sort())))
    rooms = _.map(rooms, (room)=> (_.map(room, ([a, b])=> ([b, a]))))
    rooms = _.filter(rooms, (room)=> (room.length !== 0))

    // step 3: find all open grids
    let openGrids: number[][] = []

    for(let room of rooms) {
        let id = grid[room[0][0]][room[0][1]]

        if(id === 'O') {
            for(let openGrid of room) {
                openGrids.push(openGrid)
            }
        }
    }

    // step 4: find rooms which not connect to open grid
    let closeRooms: number[][][] = []

    for(let room of rooms) {
        let isCloseRoom = true

        for(let roomGrid of room) {
            for(let openGrid of openGrids) {
                let [x, y] = roomGrid

                if(_.isEqual([x-1, y], openGrid)
                || _.isEqual([x+1, y], openGrid)
                || _.isEqual([x, y-1], openGrid)
                || _.isEqual([x, y+1], openGrid)
                || x === 0
                || y === 0
                || x === grid.length - 1
                || y === grid[0].length - 1) {
                    isCloseRoom = false
                }
            }
        }

        if(isCloseRoom) {
            closeRooms.push(room)
        }
    }

    const closeRoomSizes = closeRooms.map((r)=> (r.length))

    return _.max(closeRoomSizes)
}


console.log(foo(["BBO","ACB","AAB"]))
console.log(foo(["BBBBBBOOOOO","ABADCBOBBBB","ABAADBOBAAB","BBBBBBOBBBB"]))
console.log(foo([
    "EECBABCEBBBCDBACDEBDCDBECBBCDDAEBCOOCCAEDDDCADAOEOBBCDEDCDDBDODEDEEDDDAECEAECECDCOEBACCDCBCOAE",
    "DCAAADBDCCADCBDOOEBECEBEAOBOADADBBDDCBDEOAEODAECEAAAAODCECBDCDBBOCOCAOODBECBEDDDEDBOCDCBBDBEAD",
    "DCEADCABDCCEEEBEAEBBBAOADOCCBCABEAACODEABADCBBAEDEDBCEDAOBDDBADECAEECCCCABAODEAACDBBCDDABEDABC",
    "ABEBAADCADEODBACDDDAAEABCODCDEBCOADADECCDAOCBBDDEDADBDCCBCAAEBEBOBODDEEBCCBACBCDCDCCAOBABDDDBO",
    "CBBOADDDCABBABEDEBCBDOCBECECECCCCOEACEACCAECOAOABDCEBBOACDEBACCDDBEOCDAEOEOCEEDBOEAACBOEBDBBBD",
    "CDOOEECOAADCEAEEOEBECEEOADDECCDDABEBECBOBCDOBCDDAEBBEEAOBDDDCBBAOBBDODBOBDDCBBBCBAADEEADAADDBC",
    "BDABAACDOCCADDDBBOOADDDCEAADEEEOCAEEOOEDBEAEDCOBOCEACCCCECCOBBCCCEDDEEDOADAABBDADDAEABBBDEODBC",
    "COCOEEABAEOCAEDOECCBBCBCDACEADECOCEBDBBDADABAAACEACBOBCODEAEEABCBBDCEEDOOCDCOACCECEBEDCADCAADE",
    "AOEBBEBBCDBDCDBEECEEOOBBECEDBEEECBABCAEDCCCOCOEAEEBEDECDCBCACOCDEEEOBBDAAAAOCDBADDBCEACEAACBCC",
    "EABDEADECDDCBAEOADECBDDAOAODDBOCDODEAEEOOABOBOAAOEBBCEBDDCOECDACBECEBCDEDDEECCCCEACBCEEECEEEBA",
    "AEDOABEABAOCDAEECEDDEDBDAEDOECAOCCDCEOAECACAEDDADDCAEOAABOBDBEBAEBCCACCAEBCAAOOEEDECEEBDEBCAOD",
    "DDECCCADCBBBBDBBEEEEDAECCCECCACOBDAEECCCDACOCCAACOECBCBBCDCEOADCECAABEABACCAOBEBBBAADECEDADAEO",
    "ABADADDBACCBCABECDDBEADCABACOCCAEEEBEBBAOOAOCECDECABDCCBOEBCACCABBDDCCDACECECABCADEODBADEDBEAA",
    "BCACABCCAAAABBAOAACBBEEDEEAAEBDEECADEBDODAAAEDAACCDEAACADBDABEDEDDOAOODABCADBDAOAAAEAEDCBCEOBA",
    "BDECAEAABCECEBBBCCCACEBADDDBDABBEEEOEBAAAABDCEAEBEEEACABOEDAABDEDOCOCDCCABEDCBAEBDDCDADCDDCBOB",
    "ADACBADAECAAAACCABECAAADEDBDCABACACBCBBEEDOAEEEAADBDEEDAEDCEAACOBBCBBEBBEDAAABEBDBDAEBDDABECAE",
    "AADBEACBOOBEBECBDEEBBCBECCEBCDAAOEDDDEACCODOOCBDEOBABDBBODBABCOBBBADDABACDDBBBCDBCOBACBOBBEEBE",
    "ODCBEBBADBBBCDBBEDCCBODCADBEECBDBDCBEEOAADABBEEOOECDBDCCDBDBDBOCDEBCBEECCAOCEACEBBCDBDCDADBAAB",
    "OCAACDBDACDCDOAEAEAOEDBBECEBBAEEOCAEECDADEDBCCEBEECOABOCOEDABAECEBDABACBBBCDEBCCECCEBDBEODEDCA",
    "CBCDABCDCOABEEEAABAAAEABEEBCDABCBEBBCCCAECCCEACCDECBBCADABDDBECAOBBOCCAEEEEDAOECDDCDCEAEBCAEEC",
    "DBCBAEAAADEBACAEACDAECACEBEEEEEEECCAADDCBCCEADEDDEBBBCEOACCOABAOEEEAEOOAEABEEBEECEEBADECDABBDD",
    "ODDEEBDDDBBABDAOBCCOACCEECBOAADBACCEEBDCBEADCBEACCACEABCDADAOCOBCEEEBDAEEBCCCBBDOOACBCBDEDEDBD",
    "CDODBBOECCEAEBACBBADECBECDEEBDEBBEAADDBCCBEDCEBDABOEDCDCDODOBBCAEAECCBBAAECEOEAACBDEEEADEAOOOC",
    "ODDEDCECDDEBCCEADBEABDOBADDCAEDBAECDEBDDEDEAEDDOBADEBACDABDOCEBBDEBOAEACBBDBBECEDCBBDOOECDADAB",
    "CDEEDDEBEEECBDADCEODCOBDEEBEECCAAODEEDCCEDCAEBBDCBCEDBABADABDDDOACCDOEECDBBEABBACBECAEAAOCECEO",
    "ACEEEDOCCEOACBDACEBODACCCCEADBCBDBOBABACCAODOCDCBDBDEBODBDCECEADBBEOABBBBDDCCCODDEDOCBEAAOCCAA",
    "AEAAOADCAODEAECDEBCDAECCEAOAABCEABBDAOEEABBDEBAODACBBEDCEEABOCDCCADDEAACDBEEDCEBBBEECBBCBDAADD",
    "AEOBCDAEEBCACOOBOBADCAAACBOCBADAEABOBACCOCEAADCCOADOEDBEODBCDACAEECBDDEAACDEECBDECEOCBBEDECEOC",
    "ADDDDCBCABCEABBADEACOAAODBBCBEDBEBACAAECBDAAEAAAECDEBAEBDCAODCBDAEADBAADECCDAACOOOBDCEBCOBDCCC",
    "ABBDCBCEDDEDEEDDEAECBADDBCDBDOBBACBOOEBDEOADEDBBCEDACEDBECCDCAEDEADBBCCBCCDBDACBDBOEDEOEBEAABD",
    "DADEDCADCAOBDCBDEEDAEDDABADCEAOEEADOBAAOABDCEOBBDAEECCCCDEOCODCEEBDDEBDDDACEBBECCCCEECDDOOABCE",
    "BDAAAOCBBOBCBCDBBDODDCACOACACBEAAOACABDBADDECDBAABABBADADECEEEOEEOBBCBACCBBCOAEAEOOBDODDADAAAA",
    "BEOAOACBCCOCBODDBOBEECBBCEECCEDCDACAAOCCCCDEBCAAOAADACEBCACCCEDOADDOCECDCADEEADBEOOODCEEBOECBB",
    "BOCDEAECDDCBCAEBECADADEABBECBAOOCCCDOAEECEECADCEDAADAEOCABDEACBBDCADEOCEDBDBCBEBBBEBADDBBECBCA",
    "BBEEDBCEOCEBCCBEACBEBDDADBDDEBDAADADECADADADDEDDBBADACAAECBDDOAAEECDADEAEBOCBADACAOODECBAEOABB",
    "OCDDCDOEOCBDACDAAACOBBAABBACEADCBCDEDBECCAEBOACEEABECBEOODADDCEBOBDDEBAACEOECBDACDCEABCEBBDOBD",
    "DOECECBBBDCCACOABDDEDDDOAEBBEAEBCDBBCCBEEDDOECCDCBADEBDCCEBOACCDACBACCCAEOBDDDDAEDCBEAECDCEBDB",
    "CAOBAAABEACCEDEDCCAODDADOCODBAAEAAECCCEBBDBCCOCCDBECOEAACEECBAEAEBBBEEAOABEBOAEAAAOADAADDOADDB",
    "DBDAAEDBDEOCOACEOCOEAOEBCDBEEAEDOEBBBAEADOAEEDBOOEBAEACDAEEBCABCADDDDCEAAEBDCOBCBCBBADEAACDAOD",
    "CDBACBACEOCAEBOEBAAAACOABOAAOAOBOAOBEBDBAAEEBBDECACBODCBAEEBCDADABECDEBEACDDCEAADDBDABAAABADOA",
    "ADCAODOADEAAEDCEOACCDADOAAEBCAOCECCDEABACBAACDODCEDCCCDBCEOODACDBBOEEBEDAOBEEDCECBCCCECADODCDO",
    "AEDEBEBCAEBEBDBAEEBCABACBABOBODBBBDAODABDOBBEAEOOCBAECAEBOODCCABDBEAECBEEDCBCABDBCBCCDOBECEDCC",
    "OACEBCACCOADCBCCDAAECBCAECODEACAAOACBDEBABECDDBCDAEAOECDADOEACAEADAABDCCDBOACOOCOBABAOEAECDADD",
    "DCCCBAAOEBDBCDAAECDBEABDDAEODAABBAACBEADADBAABCDCECOOAEOECAEDABDBBABDDCEACCCEDABDDBACEDEEBCEOB",
    "ACDBBDDDBCBCCCBEDCAEAOABACBCECEACECACEDBDACDDBECDDCAOABAECEEBDABAEEABBACEDDDEEOODBDDACOEDDCDEC",
    "EECEDEDEBADABOEEEDAOADEECOOBABCDEDDAEDCEBBEACOEBBEEBODCDDBDACBDCDCEEDECECACAAABEBADCDEBDOBEDBO",
    "EEEDCABACBCDCEECACCBDECOACCEDCBBEADOBAACBCOOBCAOEOBAAAEDEDECDCAEDEDADCOECEBEBCDOBBBAOCDEBCEEBO",
    "EDDEEDOABDDEDEACDADAEDBECOOADBDEDAADBCDEAEOBOAADAOCBBBDOADBBBDEBACACBDCOBEBEDCOOOAEODDAAAEEABC",
    "ADCDBEACDACAABDODOAEDBCCDCADDDEBOEBBEDEDDBCODOOBAODCEDECAABAOECBDODACOCDBEDADOEDAEADCDDCDBDBDO",
    "DBODDCCBDECEABCEODDDOBBOBDECACOCAEOCBAOECDDADEOEBEOCAAAEOAOCBBCOEBDCACEAEBAEADCCDCEDCABBCDODED",
    "EBEOBEDEEODACOBOCAEBOCEBEDEEDBDAAACCBECCOCEDDEODDADCOOBODDACCBAEADBACCEAADBDABOOEBDOAEABCOBECO",
    "BCEODOCDAODDBCDAAEODDEEOCAADADBDBDDEDAAOEACECADEBACEOCBAAEACEOBOEADCDBDDEAABACCCOAECDBEAEAEOAE",
    "DCOBDDDOCCCBDCDCCAADBABADBCBODDEAAADBBEDECCOCECBDDDDOBBEBEBBBCBBADOEACCEBBEBAOBBEOBEEDDCBCABCD",
    "CECBABBABAEEDEACACCEBDEEDBBAAABAEODAAOCCEAEDEEADDCDEEEAECACCCECCEDEODODDBOABBCCDEDECDAAOOBEBDE",
    "BECOCCDBDDCBCOEABOECBAOCACADAAEBDDBBECAECEDBCBDCECABACBABDBOAAABOBOBAABCBEAEDCBACDEAADDBAADAOB",
    "ABOOBBDDBBDDEACEDOCEODAACOEECCDEAACCDDDCBBEBABCBBDEABECEECEDBBDECOAEBCECOEDEDABABBODOEBECBBCAB",
    "DACBDDBACDCOCCEEEECDAEDAOCEBODEODDBBOBEDCEOABBCBBCCADEABCCOAEBABEOAACDDOOECDOCCODCCEOEEAODADAC",
    "AOEAOACDOBABBEOBEDACAODACCBACADDCCDBCEAODBBECEDAOOOCEDCOEAEEEDDAAADBAEODODEDECOABEODBECAEEBDAE",
    "OAAEBDDEAOEEBAEABDCDABEBDBBABCECODEABAEDCCBEAABEBEAECCBDCOCBEAOEBBODBEDDEDDEEOEEADBAEEACCBCDEB",
    "CCAEEEBADAAEBEAEBBCDOEBODOADOBECCDBECODABODBDBADOADDBCEEEDOAEACBCDDBBBOBCBBCECCCOBBCOBEDECECDC",
    "EOBEOOABAOBCAOACDCDEBAEBBAAABABDEACDCEDOBEDECACACACECCODBDBBBOCBAADCODBAACBODDEEOODEAEECCEAABE",
    "DEEEECDEEBCBDBDBDCDABDDAACBEOEEBABCEOBOEBAEOCBBADBBADDADBDBAACECBADCEOEDACCBBBEDAAACDEBBCBCDDD",
    "DBBCBBEACEODECBBBBBABOABBDOABDAABCBCOCCOBECABDCCDABBACABECBACDDCEDDADCEEBAAEAADCCBBAEOCEAODABE",
    "BAEDEEAOBADCAEBDCDEBBEAAEDCBBCBDCEEDCAAECCDDDDDCBDEECBEECBDOEDODEDDAADBOBCDEECBBCEBBACABBOCBEE",
    "CCDCAEAEDCBOEDOODCEEOEBDACEAAADEBBACABODOEDEBECDAECEBEDBBABEBDDCDDOCOOEEECDBDDCCDBOEEEDBCCDAAO",
    "ACCODAEECDABBDABAABDDOCDCBEEAACCDEDCCBCABOOBEDDOCDEDADBDAEAEBBODOEOABDEOECEBBCBDBECCDAEEEAAABE",
    "CDEEDAABEBEECEDCAOEABDBDAAAAEDAEBBCAEEOEBAOOCOBACEAACEEEEBCBEDDBDCEABEECECBOEEEDEACECEABOEDOEE",
    "OOOADEDAECEEDDEDAEAAEBACEOCCAOBDOBCCDCABEOAAOCDAEBDECOAOAECCDDBABODCEBEEDCAECOACBDBAAEECAEDODO",
    "EADDCDCAEEEBCOCCEEDDEBECACEEDAABOEOBDCBBBCBEEDEACECEEAABEDDAEBBCCABBBBECBDEADDECCDCADABCCDDODD",
    "BODOEAOCABCBAECBBEDOABEEDCBEDEDCEAEOCEEBACADEEEBDDBEODECECECDCEEAAOABBDOCADOBCBCCCOCAECAOCCAAC",
    "CACBEDOBCEAABCBDDEECEECDCDADACEEAOAECCEAEBBDBBEBOABBEADADCCCOEBBEEABOBOAECEEAACBAEOBDCOAEADECB",
    "ECDAEDCBEBCDDOCBACBABCBCEEBBECECACBODCDEAAACCEAEEBADBBBODEBECADECBEBDDBBDBDEDBOCEDBADADBCAAEOO",
    "DCBOCBBABAADOBBBADEDEAEOEBADBBEBABAEDBDBCDDCCEADBOCACDADCCABBCCAABBBBACCOCAAOCEDADAECOBAOEACBA",
    "BCOEAODBBDAECAEAAAABDCEAEBCACDAABCBBCBDECAEDAEAOCCBBEDECEEEACBDDBBBDAADBAAADADDDEBBCACEBEDBEOD",
    "DCDBOBAAEDDDEACDADEEECDABBDBCABBDADEDBECOEEOCDCEEBBECABBADACEAEABBOAADCAOCDCAAEBCDDAEOBECBCAAD",
    "CECCBDDDADEDECDCDOOECCCADBBCECEOEDBAADABDOCOBEBCAOACDEDODCCBACCCECOCDADEACAOEABDBBDCBECBAAEACD",
    "OAEBDDDBBBBOEBBECEBADEEDDDADDEBAADDOBOABACCOOBDABAEBACBEEBAOADCAOBDOCCBEDEDEECCBEBEDDBOCOBDADD",
    "OAEOABOCAOOOABCBOEABCCACBBDBCBDACCCCCBCCAOOCCEEAEBEABOCCDCEABDBDECBBEDCBCEBCADACDACAOBEBDCBBAB",
    "DODBAAEEADBEEEEEBEDBEAECCECEBDEBBODCABAAOAAEACCDCEDBBCEBEBCBEECEACBEBBCCOEOODECBBEBEEDBBEDDDCE",
    "OEAOBACACCDEAAEABEDOADBADADAAEBAAAEACAOOABDBAODODAAACABOBDDEBEECCCACECCECEADCDDDEBBBCCACDBECAB",
    "ABAEEEBBACCACDEBBAEEBACBCEAEDODDECABDBDDBEAEDEODCBBADBECCDBCBOOAABOCCOEEBCECCBCDAAOBEADBAEOACC",
    "CABABEOAAEDEDOBEEEDAOEBOECBCCBDDBECEBCCODACCDAEEECEAAEDOAADCDAODADOAEDBADBBBABBOBBBBADAOCCBBOE",
    "BBEADBBBBEDAEBDCAEDCDOAEEEEBCDECBBCADCCCABCOCACAACBOCDADBBEODCOACBAEDEOACADEAOCCDBCDDEOCEADAAA",
    "DCAEDDOEBEDDBDCABCEDEBCAOBCBDBCEBDAEBAEACEADODDCOOOEDEBCOADCBBDCEEABEBADCOAEEBBECBCAOEAEEBBACB",
    "OODBEEDACBBOCABDOEBDDEADOAEDBCDBDDDECCEADCEDBBOOACCBAEOADCDCEEAODAAEOBECAEDAEDACBADBDCDCADEABE",
    "CEACCBDOBEAADBEABBEDEACAEACBODEDEOABDEBCCBADEOCEBBDAOBAEBDEBAECEDAAADOAECBBCEEDABBEOEBBBEEADBC",
    "ECEDOOAAAABODABABAOABACDCBADEAECADBOCBEABCCDAOCAOCDCDBOBAEBCBADDCACEAEEDAEDEDOEAEAECDCDOEADBCB",
    "ABDAAABCADDOEBDCCOCEABCCDDAABEAABBBDECBCBAEECOEAACCDCDBCBDDDCACBOBDABBACDDEBAACECAACDCAADADEAB",
    "CAOBDADEEECADDBECDDDAABDDDEBBBDABACBOBEDDECDDDCECEEOEBEBBBCCEBEDCDDECCCDACCCOCBEAEBADAECCDBAEC",
    "EDOCCDBEDAEBDDDBBODAEBCEOECCEBCCDEEAEACBDBEAACCBDECOEOEAAADOADACDEEECAACBAAEEAEOCACBBBBACAOBCB",
    "EBDEEADECCDBACODBDBBDAOCCECCDAAAEBCDABDEEBCADACDCDAOCBOEDADEOAOEBODEDBDCAEBDDECACADBAAACBCDCED",
    "ABCDAEBACEDEDCBBEBDADACBABEBBBCCECCEDCOEAEAEDDDECBDCDOEOEOBECADDEBBBCCOBDCEBDDEBCCADDAAEEOEBBD"
]))