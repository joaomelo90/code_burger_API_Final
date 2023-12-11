import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userError = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your passoword or email are correct' })
    }
    if (!(await schema.isValid(request.body))) userError()
    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })
    if (!user) userError()

    if (!(await user.checkPassword(password))) userError()

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}
export default new SessionController()
