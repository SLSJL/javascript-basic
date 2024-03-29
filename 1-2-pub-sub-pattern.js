/**
 * 发布-订阅模式
 */
//定义一家猎人工会
//主要功能包括任务发布大厅(topics)，以及订阅任务(subscribe)，发布任务(publish)

class HouterUnions {
  constructor() {
    this.type = "hunt";
    this.topics = Object.create(null);
  }
  subscribe(topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(fn);
  }
  publish(topic, money) {
    if (!this.topics[topic]) return;
    for (let fn of this.topics[topic]) {
      fn(money);
    }
  }
}

//定义一个猎人类
//包括姓名，级别

class Hunter {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  subscribe(topic, fn) {
    console.log(
      this.level + "猎人" + this.name + "订阅了狩猎" + topic + "的任务"
    );
    HouterUnion.subscribe(topic, fn);
  }
  publish(topic, money) {
    console.log(
      this.level + "猎人" + this.name + "发布了狩猎" + topic + "的任务"
    );
    HouterUnion.publish(topic, money);
  }
}

const HouterUnion = new HouterUnions();
//猎人工会走来了几个猎人
const hunterMing = new Hunter("小明", "黄金");
const hunterJin = new Hunter("小金", "白银");
const hunterZhang = new Hunter("小张", "黄金");
const hunterPeter = new Hunter("Peter", "青铜");

//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe("tiger", function(money) {
  console.log("小明表示：" + (money > 200 ? "" : "不") + "接取任务");
});
hunterJin.subscribe("tiger", function(money) {
  console.log("小金表示：接取任务");
});
hunterZhang.subscribe("tiger", function(money) {
  console.log("小张表示：接取任务");
});
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe("sheep", function(money) {
  console.log("Peter表示：接取任务");
});

//Peter发布了狩猎tiger的任务
hunterPeter.publish("tiger", 198);

//猎人们发布(发布者)或订阅(观察者/订阅者)任务都是通过猎人工会(调度中心)关联起来的，他们没有直接的交流。
