import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    /**
     * Assert user email
     * @param options email - user email address
     */
    async assertEmail(options: { email: string }) {
        if (options.email) {
            let userOfEmail: { user };
            try {
                userOfEmail = await this.findByEmail(options);
            } catch (error) {
                userOfEmail = undefined;
            }
            if (userOfEmail) {
                throw new ConflictException(`User with email "${options.email}" is exists`);
            }
        }
    }

    /**
     * Save user to DB
     * @param user 
     */
    async create(user): Promise<UserEntity> {
        await this.assertEmail({ email: user.email });
        const newUser = await plainToClass(UserEntity, user).setPassword(user.password);
        return await this.repository.save(newUser);
    }

    /**
     * Find user by email
     * @param options email - user email address
     */
    async findByEmail(options: { email: string }) {
        try {
            const item = await this.repository.findOneOrFail({
                where: {
                    email: options.email
                }
            });
            return {
                user: item
            };
        } catch (error) {
            throw new BadRequestException('Incorrect email or password');
        }
    }

    /**
     * Find user by ID
     * @param id User ID
     */
    async findById(id: string): Promise<UserEntity | null> {
        return await this.repository.findOneOrFail(id);
    }

    /**
     * FindOne by email and return (email, password)
     * @param email 
     */
    async findByEmailWithPassword(email: string): Promise<UserEntity> | null {
        return await this.repository.findOne({ email });
    }

}
