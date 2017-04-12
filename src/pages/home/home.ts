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
    this.search.initSearch(this,'data/search/arrsefej.json')
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
      ord: '',
      ent: '1',
      defa: [{ value: 4, type: '1', name: 'type' }],
      flt: []
    },
    searchs: [],
    filt: [],
    currentsearch: []
  }



  Alert = false;
  searchs = false;
  filt = false;

  currentIndex
}
