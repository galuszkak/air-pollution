import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class SchoolMeasurments {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    school_name: string;

    @Column()
    street: string;

    @Column()
    post_code: string;

    @Column()
    city: string;

    @Column('float')
    longitude: number;

    @Column('float')
    latitude: number;

    @Column('float')
    humidity: number;

    @Column('float')
    pressure: number;

    @Column('float')
    temperature: number;

    @Column('float')
    pm10: number;

    @Column('float')
    pm25: number;

    @Column({ type: 'timestamptz' })
    date_time_with_timezone: Date;

    @CreateDateColumn()
    createdDate: Date
}