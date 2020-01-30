import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Validate } from 'class-validator';
import * as bcrypt from 'bcrypt';


@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 200,
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column({
        length: 250,
    })
    password: string;

    @Column({
        default: () => `now()`,
    })
    date_created: Date;

    async createPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    async setPassword(password: string) {
        if (password) {
            this.password = await this.createPassword(password);
        }
        return this;
    }
}
