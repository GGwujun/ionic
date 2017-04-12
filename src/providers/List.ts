import { Injectable } from '@angular/core';

import { Net } from '../providers/Net';


@Injectable()

export class List {

    constructor(public net: Net) { }

    initData($this, callback) {
        this.net.ajax('list', $this.conf.data, function (data) {
            if (data.success) {
                if (data.data.length) {
                    $this.conf.loadtext = '加载更多数据...';
                    $this.conf.infiniteIcon = 'bubbles';
                    if ($this.conf.refresh) {
                        $this.items = data.data;
                    }
                    else {
                        data.data.forEach(item => $this.items.push(item));
                    }
                    $this.conf.nullData = true;
                    callback && callback(data);
                } else {
                    $this.items = [];
                    $this.conf.nullData = false;
                }
            } else {
                alert('网络错误');
            }
        });
    }



    //上拉刷新
    doRefresh($this, refresher, callback) {
        let that = this;
        $this.conf.data.page = 1;
        setTimeout(() => {
            $this.conf.refresh = true;
            that.initData($this, function () {
                $this.conf.refresh = false;
                $this.infiniteScroll && $this.infiniteScroll.enable(true);
                $this.infiniteScroll = null;
                $this.conf.end = false;
                $this.conf.start = false;
                refresher.complete();
            });
        }, 200);
    }




    // 下拉刷新
    doInfinite($this, infiniteScroll, callback) {
        if (!$this.conf.end && !$this.conf.start) {
            let that = this;
            $this.conf.data.page++;
            $this.conf.start = true;
            setTimeout(() => {
                that.initData($this, function (data) {
                    $this.conf.start = false;
                    if ($this.items.length == data.total) {
                        $this.infiniteScroll = infiniteScroll;
                        //infiniteScroll.enable(false);
                        $this.conf.end = true;
                        $this.conf.infiniteIcon = 'none';
                        $this.conf.loadtext = '亲，已到低了哦！';
                        callback && callback(data);
                    }
                    infiniteScroll.complete();
                });

            }, 200);
        }
    }

}
