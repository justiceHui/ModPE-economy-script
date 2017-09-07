/*
계획
1. 플레이어 사살시 1000원
2. 적대적 몹 사살시 500원
3. 중립 몹 사살시 300원
4. 사망시 -300원
<이름>: {money: <돈>, job: <직업>}

적 50~66
중립 90~100

나무 곡괭이로 나무 터치시 회원가입 270 17
*/
/*file*/
var osPath=android.os.Environment.getExternalStorageDirectory();
var path=osPath + "/matt9316/economy";
var tmpFile=new java.io.File(path);
tmpFile.mkdirs();
var moneyPath=path + "/money.txt";
makeFile(moneyPath);
if(readFile(moneyPath)==null) saveFile(moneyPath, '{\n"jhnah917": {"money": "0", "job": "null"},\n"matt9316": {"money": "0", "job": "null"}\n}', false);
var moneytext="";
//moneytext=readFile(moneyPath);
var moneyJson="";
var mobf=[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22];
var mobe=[20, 21, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
//if(moneytext!=null) moneyJson=JSON.parse(moneytext);

/*ModPE*/

function newLevel(){
  if(readFile(moneyPath)==null) makeFile(moneyPath);
  moneytext=readFile(moneyPath);
  if(moneytext!=null) moneyJson=JSON.parse(moneytext);
}

function procCmd(cmd){
  if(cmd=="stat"){
    clientMessage("text: " + moneytext.replace(/}/g, "\n") + "\njson: ");
    for each(var i in moneyJson){
      clientMessage(i.toString());
    }
  }
}

function useItem(x, y, z, i, b){
  if(i==270 && b==17){
    var name=Player.getName(getPlayerEnt());
    var tmp="{\n";
    //print(moneytext.length);
    var len=new Number(moneytext.length);
    //print(len);
    //print(moneytext.toString());
    //print(moneytext.toString().length);
    if(len==NaN){
      print("fuck");
      return;
    }
    tmp+=moneytext.substring(1, JSON.stringify(moneyJson).length-1);
    tmp+=', \n\"' + name + '\"' + ': {\"money\": \"0\", \"job\": \"null\"}';
    tmp+="}";
    moneytext=tmp;
    moneyJson=JSON.parse(moneytext);
    saveFile(moneyPath, JSON.stringify(moneyJson), false);
    clientMessage("회원가입 완료");
  }
}

function leavegame(){
  saveFile(moneyPath, JSON.stringify(moneyJson), false);
}

function deathHook(a, v){
  //사살
  if(Player.isPlayer(a)){
    //p vs p
    if(Player.isPlayer(v)){
      moneyJson[Player.getName(a)]["money"]=(parseInt(moneyJson[Player.getName(a)]["money"])+1000).toString();
      moneyJson[Player.getName(v)]["money"]=(parseInt(moneyJson[Player.getName(v)]["money"])-300).toString();
      clientMessage(Player.getName(a) + "님 +1000 && " + Player.getName(v) + "님 -300");
      clientMessage(moneyJson[Player.getName(a)]["money"] + "//" + moneyJson[Player.getName(v)]["money"]);
    }

    //p vs e
    else if(isEnemy(v)==1){
      moneyJson[Player.getName(a)]["money"]=(parseInt(moneyJson[Player.getName(a)]["money"])+500).toString();
      clientMessage(Player.getName(a) + "님 +500");
      clientMessage(moneyJson[Player.getName(a)]["money"]);
    }

    else if(isEnemy(v)==2){
      moneyJson[Player.getName(a)]["money"]=(parseInt(moneyJson[Player.getName(a)]["money"])+300).toString();
      clientMessage(Player.getName(a) + "님 +300");
      clientMessage(moneyJson[Player.getName(a)]["money"]);
    }

  }

  saveFile(moneyPath, JSON.stringify(moneyJson), false);
  moneytext=JSON.stringify(moneyJson);
}

function isEnemy(ent){ //1 적 2 중립
  var code=Entity.getEntityTypeId(ent);
  for each(var i in mobe){
    if(i==code) return 1;
  }
  for each(var i in mobf){
    if(code==i) return 2;
  }
  return 0;
}

function readFile(path) {
    try {
        var file = new java.io.File(path);
        if(!(file.exists())){
          print("파일이 존재하지 않습니다.");
          return null;
        }
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var s = br.readLine();
        var read = "";
        while((read = br.readLine()) != null) s += "\n" + read;
        fis.close();
        isr.close();
        br.close();
        return s;
    }catch(error) {
        print("error : " + error);
    }
}


function saveFile(path,content,bool){
    try{
        var file = new java.io.File(path);
        if(!file.exists()){
          print("파일이 존재하지 않습니다.");
          return null;
        }
        var fw = new java.io.FileWriter(file,bool);
        var bw = new java.io.BufferedWriter(fw);
        var str = new java.lang.String(content);
        bw.write(str);
        bw.close();
        fw.close();
    }catch(e){
        clientMessage(e);
    }
}


function makeFile(path){
    try{
        var file = new java.io.File(path);
        if(file.createNewFile()){
            print(" "+path+" 으로 파일생성완료");}
        else{}
    }catch(e){
        clientMessage(e);
    }
}
