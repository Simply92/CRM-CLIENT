const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')

const resolvers = {
    Query:{
        obtener: () => "algo"
    },
    Mutation:{
        nuevoUsuario: async (_, { input }) => {
            const {email, password} = input

            const existeUsuario = await Usuario.findOne({email})
            if(existeUsuario){
                throw new Error('El usuario ya esta registrado')
            }
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)

            try {
                const usuario = new Usuario(input)
                usuario.save()
                return usuario
            } catch (error) {
                console.log(error)
            }
        },
    }
}

module.exports = resolvers