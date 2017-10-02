# ModPE-economy-script 

##이 프로젝트/API는 CC BY-NC-ND(저작자 표시, 비영리적 사용, 변경금지)를 준수합니다.
위반시 민사적 책임이 따를 수 있습니다.

<hr/>

##economyAPI 사용법
----------

###-1.1 update-

####Matt.setMoneyEnt(ent, money) 해당 엔티티의 돈을 설정
####Matt.setMoneyName(name, money) 해당 플레이어의 돈을 설정
####Matt.resetMoneyEnt(ent) 해당 엔티티의 돈을 초기화
####Matt.resetMoneyName(name) 해당 플레이어의 돈을 초기화

###-1.0 update-

####Matt.signUpEnt(ent) 엔티티 값으로 플레이어 회원가입

####Matt.signUpName(name) 이름으로 플레이어 회원가입

####Matt.getMoneyEnt(ent) 엔티티 값으로 플레이어 돈 체크(가입 안되어 있을시 null 리턴)

####Matt.getMoneyName(name) 이름으로 플레이어 회원가입 엔티티 값으로 플레이어 돈 체크(가입 안되어 있을시 null 리턴)

####Matt.giveMoneyEnt(ent, money) 엔티티 값으로 플레이어 돈 지급(지급 후 돈 리턴, 가입 안되어 있을시 null리턴)

####Matt.giveMoneyName(name, money) 이름으로 플레이어 돈 지급(지급 후 돈 리턴, 가입 안되어 있을시 null리턴)
