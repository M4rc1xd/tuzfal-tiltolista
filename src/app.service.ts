import { Injectable } from '@nestjs/common';
import mysql, { RowDataPacket } from 'mysql2/promise';
import {Blocked} from './blocked.js';
import {felvetelDto} from './felvetel.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'test'
});

@Injectable()
export class AppService {

  async getSortedBlocked() {
    const [rows] = await mysqlConnection.execute(
      `SELECT id, priority, mac, enabled FROM blocklist Order By priority ASC`
    );
    return rows as Blocked[];
  }

  async ujBlocked(felvetel: felvetelDto){
    const [results] = await mysqlConnection.execute
    ('INSERT INTO blocklist (priority, mac, enabled) VALUES (?, ?, ?)', [felvetel.priority, felvetel.mac, felvetel.enabled]);
    console.log(results);
  }
}
