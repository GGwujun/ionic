import { Injectable } from '@angular/core';

import { List } from '../providers/List';
import { Net } from '../providers/Net';


@Injectable()

export class Search {

    constructor(public list: List, public net: Net) { }

    initSearch($this, url) {
        this.net.ajax('get', { url: url }, function (data) {
 
            data.filt.forEach(function (item,index) {
                $this.conf.filt.push({
                    id: index,
                    name: item.name,
                    class_name: item.class_name
                })
            })

            data.list.forEach(function(item,index){
                $this.conf.searchs.push({
                    class_name:item.class_name,
                    id:item.id,
                    ismore:item.ismore,
                    name:item.name,
                    sub_cat:item.sub_cat
                })
            })

            data.svr.forEach(function(item,index){
                $this.conf.searchs.push({
                    class_name:item.class_name,
                    id:item.id,
                    ismore:item.ismore,
                    name:item.name,
                    sub_cat:item.sub_cat
                })
            })

            data.url.forEach(function(item,index){
                $this.conf.searchs.push({
                    class_name:item.class_name,
                    id:item.id,
                    ismore:item.ismore,
                    name:item.name,
                    sub_cat:item.sub_cat
                })
            })
        })
    }

    searchSwitch($this, name) {
        $this.Alert = true;
        if (name == 'searchs') {
            $this.searchs = true;
            $this.filt = false;
        } else if (name == 'filt') {
            $this.filt = true;
            $this.searchs = false;
        }
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
        $this.conf.data.sort=name;
        this.addActive(event);
        this.Alerthide($this);
        this.list.initData($this, null);
    
    }

}
