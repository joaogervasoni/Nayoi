module.exports = 
{
    name: "pt-br",
    commands:[
        {
            name: "geral",
            cmd: {
                helpReturn: "Para saber informações do comando digite `{prefix}help {cmdName}`"
            }
        },
        {
            name: "test"
        },
        {
            name: "commands",
            cmd: {
            },
            help: {
                description: "Traz a lista de comandos disponíveis",
                usability: "Para trazer a lista de comandos digite `{prefix}commands`\n"
                + "Para trazer a lista de um tipo de comando digite `{prefix}commands tipodecomando`",
            }    
        },
        {
            name: "help",
            cmd: {
            },
            help: {
                description: "Traz informações sobre comandos",
            }    
        },
        {
            name: "tempo",
            cmd: {
                tempname: `Temperatura de {weather.name}`,
                temp: `Temperatura:`,
                sens: `Sensação:`,
                local: `Local:`
            },
            help: {
                description: "Traz a temperatura atual do local requisitado",
                usability: "Pode ser utilizado de maneira simples `{prefix}tempo local`\n",
                others: "A utilização de acentos ou 'ç' na pesquisa pode não retornar dados",
            }
        },
        {
            name: "sayembed",
            cmd: {
            },
            help: {
                description: "Manda uma msg embed pelo Bot",
                usability: "Pode ser utilizando usando `{prefix}sayembed título || msgaqui`\n"
                +"Também pode ser mandando em um chat diferente usando`{prefix}sayembed #channel título || msgaqui`\n"
                +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n",
            }
        },
        {
            name: "say",
            cmd: {
            },
            help: {
                description: "Manda uma msg pelo Bot",
                usability: "Pode ser utilizando usando `{prefix}say msgaqui`\n"
                +"Também pode ser mandando em um chat diferente usando`{prefix}say #channel msgaqui`\n"
                +"**Os comandos say e sayembed utilizam os mesmos parâmetros**\n",
            }
        },
        {
            name: "mal",
            cmd: {
                fieldName: "Nome:",
                fieldScore: "Score:",
                fieldType: "Tipo:",
                fieldVol: "Volumes:",
                fieldRated: "Rated:",
                fieldVol: "Volumes:",
                titleCharacter: "Character",
                resultNull: "Não encontrei nada :worried:"
            },
            help: {
                description: "Puxa informações do MAL ( My Anime List )",
                usability: "Pode se pesquisar um anime facilmente `{prefix}mal an naruto`\n"
                +"Também podemos retornar mangás e outras informações `{prefix}mal mg naruto`\n"
                +"**Após o mal podem ser utilizadas as seguintes informações:**\n"
                +"`ch` - Para encontrar um personagem\n"
                +"`pf` - Para encontrar um perfil no MAL\n",
            }
        },
        {
            name: "info",
            cmd: {
                titleBot: "Informação do Bot",
                titleServer: "Informações do Servidor",
                fieldName: "Nome:",
                fieldCreator: "Criador:",
                fieldCreatedAt: "Criado em",
                fieldEnterAt: "Entrou em",
                fieldMemberTotal: "Total de membros",
                fieldRegion: "Região",
                fieldUser: "Usuário",
            },
            help: {
                description: "Traz informações sobre pessoas e servidor",
                usability: "Para trazer informações sobre você digite `{prefix}info`\n"
                + "Para trazer informações sobre alguem digite `{prefix}info @usuário`\n",
                additional: "`{prefix}info bot` - Exibe informações do bot\n"
                +"`{prefix}info server` - Exibe informações do servidor\n",
            }
        },
        {
            name: "corona",
            cmd: {
                fieldConfirmed: "Confirmados:",
                fieldDeaths: "Mortes:",
                fieldRecovered: "Curados:",
                fieldDate: "Data:",
                footer: "Não saia de casa !!",
                resultNull: "Não encontrado !! `Obs: O nome do País deve ser em inglês`\n"
                + "Digite `{prefix}corona lista` para ver a lista de países !!"
            },
            help: {
                description: "Mostra casos de corona",
                utility: "Para trazer informações sobre algum Pais digite `{prefix}corona nomedopais`\n",
                additional: "`{prefix}corona lista` para ver a lista de países !!",
                others: "O Nome do Pais deve ser em inglês",
            }    
        },
        {
            name: "calculator",
            cmd: {
                returnResult: "Resultado:",
                validResult: "Digite uma conta valida !! :scales:"
            },
            help: {
                description: "Faz o cálculo de valores",
                utility: "Para fazer uma conta digite `{prefix}calc 1+1`\n",
                others: "Para calcular um valor antes utilize () ex: `1+1/(2-1)`",
            }    
        },
        {
            name: "avatar",
            cmd: {
                embedTitle: "Imagem de",
                embedDescription: "[Clique aqui]({avatarURL}) para abrir a imagem em seu browser"
            },
            help: {
                description: "Mostra a imagem de avatar da pessoa",
                utility: "Para fazer uma conta digite `{prefix}avatar @usuário`\n",
            }    
        },
        {
            name: "howboomer",
            cmd: {
                embedTitle: "Quão Boomer vc é?",
                userIs: "é",
                youIs: "Você é"
            },
            help: {
                description: "Quão boomer você é ?",
            }    
        },
        {
            name: "howcommunist",
            cmd: {
                embedTitle: "Quão comunista vc é?",
                userIs: "é",
                youIs: "Você é",
                how: "comunista",
            },
            help: {
                description: "Quão comunista você é ?",
            }    
        },
        {
            name: "howfurry",
            cmd: {
                embedTitle: "Quão furry vc é?",
                userIs: "é",
                youIs: "Você é",
            },
            help: {
                description: "Quão furry você é ?",
            }    
        },
        {
            name: "howgay",
            cmd: {
                embedTitle: "Quão gay vc é?",
                userIs: "é",
                youIs: "Você é",
            },
            help: {
                description: "Quão gay você é ?",
            }    
        },
        {
            name: "howjojo",
            cmd: {
                embedTitle: "Quão JoJo Fag vc é?",
                userIs: "é",
                youIs: "Você é",
            },
            help: {
                description: "Quão jojofag você é ?",
            }    
        },
        {
            name: "emojimaker",
            cmd: {
                returnEmoji: "Novo emoji criado por:",
                returnEspaceError: "Os dois emojis precisam estar separados por `espaço` !!",
                returnInvalid: "Algum dos emojis é `inválido` ou é um `emoji padrão !!`",
            },
            help: {
                description: "Pode ser utilizado de maneira simples `{prefix}gif emoji1 emoji2`\n",
                others: "Os emojis devem ser custom, no caso adicionados ao servidor, emojis padrões como 🚀 ou de outros servidores não funcionam",
            }    
        },
        {
            name: "gif",
            cmd: {
                returnNull: "Não encontrei nenhum gif :worried:",
                embedTitle: "Primeiro resultado de",
            },
            help: {
                description: "Traz o primeiro gif do tenor",
                usability: "Pode ser utilizado de maneira simples `{prefix}gif nomedogif`\n",
            }    
        },
        {
            name: "kill",
            cmd: {
            },
            help: {
                description: "Faz a pessoa morrer de alguma maneira",
                usability: "Pode ser utilizado de maneira simples `{prefix}kill @usuário`\n",
            }    
        },
        {
            name: "sharingan",
            cmd: {
                returnNull: "Você esta sem Chakra :anger: !!",
                embedDescription: "Cópia de",
            },
            help: {
                description: "Traz a ultima msg da pessoa selecionada",
                usability: "Pode ser utilizado de maneira simples `{prefix}sharingan @usuário`\n",
                others: "A msg retornada é referente ao canal onde foi utilizado o comando",
            }
        },
        {
            name: "snipe",
            cmd: {
                embedAuthor: "Deletada por",
                returnNull: "Sem mensagem :worried:",
            },
            help: {
                description: "Traz a ultima msg deletada do canal",
                usability: "Pode ser utilizado de maneira simples `{prefix}snipe`\n",
                others: "A msg retornada é referente ao canal onde foi utilizado o comando",
            }    
        },
        {
            name: "autodeletemsg",
            cmd: {
                returnNull: "Não encontrei nenhum canal :worried:",
                statusOk: "Autorole já esta:",
                statusNew: "AutoDeleteMsg agora esta",
                embedTitle: "Canais com",
            },
            help: {
                description: "Deleta msgs para deixar apenas imagens no canal desejado",
                usability: "Pode ser ativo utilizando `{prefix}autodeletemsg on #chat`\n"
                +"Para desabilitar use `{prefix}welcome off #chat`\n",
                additional: "`{prefix}autodeletemsg show` - Para mostrar todos os canais com autodeletemsg\n",
            }    
        },
        {
            name: "autorole",
            cmd: {
                returnNull: "Não encontrei esta `Role` :cry:",
                statusOk: "Autorole já esta:",
                statusNew: "Autorole agora esta",
                roleChange: "Role trocada :sunglasses:!!",
                roleAtual: "Role atual é:"
            },
            help: {
                description: "Gerencia autorole do servidor dando cargo automáticamente para quem entra",
                usability: "Pode ser ativo utilizando `{prefix}autorole on @cargo`\n"
                +"A role pode ser alterada utilizando `{prefix}autorole rol @cargo`\n",
                additional: "`{prefix}autorole off` - Desabilita o autorole\n",
            }    
        },
        {
            name: "banner",
            cmd: {
                statusOk: "Banner já esta",
                statusNew: "Banner de bem-vindo agora esta",
                welcomeOff: "O Bem-vindo esta `{guild.welcome.status}`"
                + "e precisa ser ativo para o banner funcionar digite`{prefix}welcome on`",
                bannerChange: "Imagem trocada `obs: As dimensões recomendadas são 1000x360!!`\n"
                + "`Digite {prefix} banner sh para ver o preview do banner`",
                invalidImg: "Não foi encontrada uma imagem valida :moyai: `A imagem deve terminar com uma extensão valida de imagem (png, jpg e outras)`!!",
                canvasFillText: "Usuário:",
                returnPreview: "`Preview do banner:`",

            },
            help: {
                description: "Adiciona banner para o bem-vindo",
                usability: "Pode ser ativo utilizando `{prefix}banner on`\n"
                +"`{prefix}banner cst urldaimg` - Troca imagem do banner de boas-vindas\n",
                additional: "`{prefix}banner off` - Para desabilitar o comando\n"
                +"`{prefix}banner show` - Para mostrar o preview do banner\n",
                others: "As dimensões do banner de boas-vindas é de **1000x360**",
            }    
        },
        {
            name: "welcome",
            cmd: {
                returnNull: "Não encontrei nenhum canal :crying_cat_face:",
                statusOk: "Bem-vindo já esta",
                statusNew: "Bem-vindo agora esta",
                msgChange: "Mensagem de Bem-vindo modificada :face_with_monocle:!!",
                channelChange: "Canal trocado :face_with_monocle:!!",
                returnAtual: "Mensagem atual é:",
            },
            help: {
                description: "Gerencia toda a parte de Bem-Vindo do servidor",
                usability: "Pode ser ativo utilizando `{prefix}welcome on #chat`\n"
                +"A mesagem pode ser alterada utilizando `{prefix}welcome msg mensagem-aqui`\n"
                +"**Dentro da msg podem ser utilizadas as seguintes informações:**\n"
                +"`{member}` - Para a pessoa ser marcada\n"
                +"`{membercount}` - Para monstrar o número de pessoas no servidor\n",
                additional: "`{prefix}welcome off` - Para desabilitar o comando\n"
                +"`{prefix}welcome ch #chat` - Altera o canal do bem-vindo\n"
                +"`{prefix}welcome sh` - Exibe msg de bem-vindo\n",
                others: "Caso queira utilizar banners no bem-vindo utilize o comando `{prefix}banner`",
            }    
        },
        {
            name: "ban",
            cmd: {
                returnNull: "Não encontrei esse usuário :thinking:",
                returnInvalid: "Essa pessoa não pode levar Banimento :flushed:",
                banMsg: "Usuário Banido: `{bUser}` || Razão: `{bReason}`"
            },
            help: {
                description: "Bane a pessoa do servidor",
                usability: "Pode ser utilizado digitando `{prefix}ban @usuario razão`\n",
            }    
        },
        {
            name: "kick",
            cmd: {
                returnNull: "Não encontrei esse usuário :thinking:",
                returnInvalid: "Essa pessoa não pode levar Kick :flushed:",
                banMsg: "Usuário kickado: `{kUser}` || Razão: `{kReason}`"
            },
            help: {
                description: "Kicka a pessoa do servidor",
                usability: "Pode ser utilizado digitando `{prefix}kick @usuario razão`\n",
            }    
        },
        {
            name: "log",
            cmd: {
                returnNull: "Não encontrei nenhum canal :crying_cat_face:",
                statusOk: "Log já esta",
                statusNew: "Log agora esta",
                channelChange: "Canal trocado :face_with_monocle:!!",
                channelAtual: "Canal de log atual é:",
                logOff: "Log esta `{guild.log.status}` e precisa ser ativado :cry:",
            },
            help: {
                description: "Gerencia toda a parte de Logs do servidor mostrando pessoas que sairam, msgs deletadas/editadas e nick alterados",
                usability: "Pode ser ativo utilizando `{prefix}log on #chat`\n"
                +"O canal pode ser alterado utilizando `{prefix}log ch #chat`\n",
                additional: "`{prefix}log off` - Desabilita o sistema de log\n"
                + "`{prefix}log show` - Mostra qual o canal atual do log",
            }    
        },
        {
            name: "notice",
            cmd: {
                invalidTime: "Preciso de um tempo valido !! :timer:",
                returnNull: "Preciso de uma mensagem :disappointed:",
                returnTime: "Seu anúncio sera enviado as:",
            },
            help: {
                description: "Cria um anuncio de postagem pelo Bot",
                usability: "Pode ser utilizando usando `{prefix}anuncio msg 10s msgaqui`\n"
                +"Também pode ser mandando em um chat diferente usando`{prefix}anuncio msg 10s #channel msgaqui`\n"
                +"**Os comandos 'msg' e 'embed' utilizam os mesmos parâmetros**\n",
                additional: "É possivel escolher entre `msg` e `embed`\n"
                +`No caso de \`embed\` utilize desta forma: \`{prefix}anuncio embed 10s Titulo || msg\`\n`,
                others: "O tempo deve ser expecificado com uma letra após o número para ser considerado um tempo valido\n"
                +"**Exemplos:** `1s(seg) | 1m (min) | 1h (hora)`",
            }    
        },
        {
            name: "tempmute",
            cmd: {
                returnNull: "Não encontrei este Usuário",
                highRole: "Cargo maior ou igual",
                returnDisabled: "Comando Desabilitado",
                returnInvalid: "Você não escreveu um tempo valido!!",
                returnMuted: "foi mutado por",
                returnRemoveMute: "foi desmutado",
            },
            help: {
                description: "Muta a pessoa escolhida por **'x'** tempo",
                usability: "Atualmente Desabilitado` :x:\n",
            }    
        },
        {
            name: "addreactions",
            cmd: {
                returnNullChannel: "Nenhum canal encontrado :worried: !!",
                initiated: "Vamos começar !!\n"
                + "Primeiro digite o que deseja mandar na msg, lembrando que o titulo e a msg devem ser dividos por **',' virgula** !!\n"
                + "`Exemplo: Um Titulo legal, Escolha a reação do pepe para receber o cargo pepe !!!`",
                roleMsgCreated: "Role Reaction e Msg criados no canal selecionado :man_mage: !!",
                msgSaved: "**Mensagem salva :sunglasses:!! **\n"
                + "Caso não tenha gostado do que digitou, digite !!clear para poder escolher novamente a msg !!\n"
                + "Agora digite os emotes divididos por **',' virgula** `Ex: :emoji:, @cargo`\n"
                + "O emoji deve ser mandado como vc utiliza-o normalmente, já o cargo é so marcar ele !!",
                returnEmojiNull: "Emoji não existe !!",
                returnRoleNull: "Role não existe !!",
                returnSave: "Emoji e Cargo salvos !!\n"
                +"`Caso queira continuar digite + grupo de emoji/cargo !!" 
                +"`Caso queira finalizar digite !!done`",
                returnExist: "Já existe, não foi salva",
            },
            help: {
                description: "Dá cargos com reações em uma mensagem",
                usability: "Pode utilizado desta forma: `{prefix}addreactions #channel`\n"
                +"**Após utilizar o comando:**\n"
                +"Digite o titulo e a msg divididos por vírgula `Ex: Titulo, toda a msg`\n"
                +"Mande uma msg com emoji e cargo para cada cargo `Ex: :emoji:, @cargo`\n"
                +"Após terminar de mandar todos os emojis e cargos utilize o comando de done `!!done`\n",
                additional: "",
                others: "",
            }    
        },
        
    ]
}
