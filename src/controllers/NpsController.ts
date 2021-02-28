import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsControlller {
  async execute (request: Request, response: Response){
    const { survey_id } = request.params

    const surveysUsersRespository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRespository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveysUsers.filter(survey => 
      (survey.value >= 0 && survey.value <= 6)
    ).length

    const promoters = surveysUsers.filter(survey => 
      (survey.value >= 9 && survey.value <= 10) 
    ).length

    const passives = surveysUsers.filter(survey => 
      (survey.value >= 7 && survey.value <= 8)
    ).length

    const totalAnswers = surveysUsers.length

    const calculate = ((promoters - detractor) / totalAnswers) * 100
    const nps = Number(calculate.toFixed(2))

    return response.json({
      detractor,
      promoters,
      passives,
      totalAnswers,
      nps
    })

  }
}



export { NpsControlller}