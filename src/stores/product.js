/**
 * Created by dfc on 2017/7/6.
 */
import {observable, action, computed, transaction} from "mobx";
import deepAssign from "deep-assign";

import {Promise} from "es6-promise";
class ProductStore {
  @observable list = [{
    task: "第一个任务",
    complete: true
  }, {
    task: "第二个任务",
    complete: false
  }];
  //相当于过滤器
  @computed get completedTodosCount() {
    return this.list.filter(item => item.completed === true).length;
  }


  @action addList(task) {
    // transaction(()=> {
    //     this.list.push({task, completed: false});
    // })
    this.list.push({task, completed: false});
  }
}


const productStore = new ProductStore();
export default productStore;
export {productStore};