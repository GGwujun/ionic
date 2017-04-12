import { Component } from '@angular/core';
import { List } from '../../providers/List';
import { Search } from '../../providers/Search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public list: List, public search: Search) { }

  ionViewDidLoad() {
    this.list.initData(this, null);
  }


  items: any = [];
  conf = {
    endtext: '',
    loadtext: 'Loading more data...',
    infiniteIcon: 'bubbles',
    nullData: true,
    data: {
      cmd: 'config',
      flag: 'module',
      _memb: '1',
      page: 1,
      cou: 20,
      sort: '',
      ord: '1',
      ent: '1',
      defa: [{ value: 4, type: '1', name: 'type' }],
      flt: []
    },
    searchs: [
      {
        "name": "课程分类",
        "id": "c7dae269-5be1-41df-8df3-c8bcae1a6bb5",
        "ismore": "false",
        "class_name": "industryclass",
        "sub_cat": [
          { "id": 523, "name": "电脑相关" },
          { "id": 166, "name": "音乐乐器" },
          { "id": 167, "name": "文化" },
          { "id": 179, "name": "娱乐休闲" },
          { "id": 180, "name": "舞蹈健身" },
          { "id": 181, "name": "其他" }
        ]
      }
    ],
    filt: [
      { id: 1, "name": "综合", "class_name": "money" },
      { id: 2, "name": "销量", "class_name": "on_qty" },
      { id: 3, "name": "价格", "class_name": "money" }
    ],
    currentsearch: []
  }



  Alert = false;
  searchs = false;
  filt = false;

  currentIndex
}
