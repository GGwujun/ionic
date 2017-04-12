import { Injectable } from '@angular/core';

import { List } from '../providers/List';


@Injectable()

export class Search {

    constructor(public list: List) { }

    searchSwitch($this, name) {
        $this.Alert = true;
        if (name == 'searchs') {
            $this.searchs = true;
            $this.filt = false;
        } else if (name == 'filt') {
            $this.filt = true;
            $this.searchs = false;
        }
        //this.initSearch($this);
    }

    Alerthide($this) {
        $this.Alert = false;
        $this.searchs = false;
        $this.filt = false;
    }



    addActive(event) {
        event.currentTarget.className = 'active';
        this.siblings(event.currentTarget, function (ele) {
            if (ele.className == 'active')
                ele.className = '';
        })
    }

    isActives($this, item, i, event) {
        this.addActive(event);
        let ret = $this.conf.currentsearch.find(function (data) {
            return data.class_name == item.class_name;
        })

        if (!ret) {
            $this.conf.currentsearch.push({
                class_name: item.class_name,
                value: i.id
            })
        } else {
            $this.conf.currentsearch.forEach(function (item) {
                if (item.class_name == ret.class_name)
                    item.value = i.id
            })
        }
    }


    siblings(elem, callback) {
        var n = elem.parentNode.firstChild;
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                callback && callback(n);
            }
        }
    }

    confirm($this) {
        $this.conf.currentsearch.forEach(function (item) {
            $this.conf.data.flt.push({ value: item.value, type: '1', 'name': item.class_name });
        })
        this.Alerthide($this);
        this.list.initData($this, null);
    }

    sort($this,event,name){
        this.addActive(event);
        this.Alerthide($this);
        // this.list.initData($this, null);
    }

    initSearch($this) {
        console.log($this.conf.currentsearch)
        $this.conf.currentsearch.forEach(function(item){
            let ids=item.class_name+item.value;
            document.getElementById(ids).className='active';
        })
    }

}
