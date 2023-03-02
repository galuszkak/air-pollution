import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { SchoolMeasurments } from './models/measurment.entity';
import { SmogData, SmogResponse } from './smogDto';

@Injectable()
export class AirPolutionServiceService {
    private readonly logger = new Logger(AirPolutionServiceService.name);
    constructor(
        @InjectRepository(SchoolMeasurments)
        private measurementsRepository: Repository<SchoolMeasurments>,
        private readonly httpService: HttpService
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const { data } = await firstValueFrom(this.httpService.get<SmogResponse>('https://public-esa.ose.gov.pl/api/v1/smog'))
        const insertBatch = data.smog_data.map((polutionMeasurement) => {
            const measurement = new SchoolMeasurments()
            measurement.school_name = polutionMeasurement.school.name
            measurement.city = polutionMeasurement.school.city
            measurement.street = polutionMeasurement.school.street || ""
            measurement.post_code = polutionMeasurement.school.post_code
            measurement.longitude = polutionMeasurement.school.longitude
            measurement.latitude = polutionMeasurement.school.latitude
            measurement.humidity = polutionMeasurement.data.humidity_avg
            measurement.pressure = polutionMeasurement.data.pressure_avg
            measurement.pm10 = polutionMeasurement.data.pm10_avg
            measurement.pm25 = polutionMeasurement.data.pm25_avg
            measurement.temperature = polutionMeasurement.data.temperature_avg
            measurement.date_time_with_timezone = new Date(polutionMeasurement.timestamp)
            return measurement
        })
        await this.measurementsRepository.insert(insertBatch);
        const count = await this.measurementsRepository.count()
        this.logger.log("COUNT: " + count)
    }
}