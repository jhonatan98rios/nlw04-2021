import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

class UserController {

    async create(request: Request, response: Response){
        const { name, email } = request.body
        
        // Repository é um gerenciador de entidades e ele trará todos os métodos necessários para a interação com o DB
        const userRepository = getCustomRepository(UserRepository)

        // SELECT * FROM users WHERE email = 'email'
        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists){
            return response.status(400).json({
                error: "User already exists"
            })
        }

        // Create a scheme
        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user)

        return response.status(201).json(user)
    }

}

export { UserController }
