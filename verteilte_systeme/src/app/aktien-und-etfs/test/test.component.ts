import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { response } from 'express';

const baseUrl = 'http://127.0.0.1:8086/';
const baseUrl2 = 'http://127.0.0.1:8080/';
// const baseUrl = 'https://jsonplaceholder.typicode.com/posts/1';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})

@Injectable({
    providedIn: 'root'
})
export class TestComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.test();
    }

    test() {
        this.http.get(baseUrl2 + 'api/test').subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    write() {
        //Connection with Database
        const influxDB = new InfluxDB({
            url: 'http://127.0.0.1:8086', 
            token: 'lGeNu2RoxrwBv9KVUQFw2OnhVzn9EsLdIWfBS6Le17slpSmnUvSyChj3vtsA-600ceruRu7MJjiJ1SudWzyqTA=='
        });

        //Definition which org and bucket
        const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'test');

        writeApi.useDefaultTags({region: 'west'});
        const point1 = new Point('temperature').tag('sensor_id', 'TLM010').floatField('value', 30);

        writeApi.writePoint(point1);

        writeApi.close().then(() => {
            console.log('WRITE FINISHED')
        });
    }
}

