import AppDataSource from '../config/orm';
import { UTChat } from '../entities/Chat';
import { UTVChat } from '../entities/UTVChat';

export const createChat = async (usersId: number[]): Promise<UTChat> => {
	try {
		let chatRepo = AppDataSource.getRepository(UTChat);
		let newChat = chatRepo.create({ miembros: usersId as any });
		return await chatRepo.save(newChat);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getChatsByUserId = async (userId: number) => {
	try {
		const chatRepo = AppDataSource.getRepository(UTVChat);
		return await chatRepo
			.createQueryBuilder('chat')
			.orWhere('JSON_CONTAINS(chat.miembros, :userId, "$")', {
				userId: userId,
			})
			.getMany();
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getChatWithMembers = async (userId: number) => {
	try {
		const chatRepo = AppDataSource.getRepository(UTVChat);
		return await chatRepo
			.createQueryBuilder('chat')
			.orWhere('JSON_CONTAINS(chat.miembros, :userId, "$[0]")', {
				userId: userId,
			})
			.getMany();
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getChatByPairUser = async (
	userA: number,
	userB: number
): Promise<UTChat | null> => {
	try {
		const chatRepo = AppDataSource.getRepository(UTChat);
		return await chatRepo
			.createQueryBuilder('chat')
			.where('JSON_CONTAINS(chat.miembros, :userA, "$")', {
				userA: userA,
			})
			.andWhere('JSON_CONTAINS(chat.miembros, :userB, "$")', {
				userB: userB,
			})
			.getOne();
	} catch (error: any) {
		throw new Error(error.message);
	}
};
