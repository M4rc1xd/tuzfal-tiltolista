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
    const macRegex = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/mi;
    const priorityRegex = /^[0-9]+$/;
    const enabledRegex = /^[01]$/;
    let enabledValue = felvetel.enabled === "1" ? 1 : 0;
    if (!macRegex.test(felvetel.mac) || !priorityRegex.test(felvetel.priority) || !enabledRegex.test(enabledValue.toString())) {
      console.log("Valami nem jo");
      return;
    }
    
    const [results] = await mysqlConnection.execute
    ('INSERT INTO blocklist (priority, mac, enabled) VALUES (?, ?, ?)', [felvetel.priority, felvetel.mac, enabledValue]);
    console.log(results);
  }
}
