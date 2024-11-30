export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
     */
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
        /**
         * Handle action click
         * Called by Token Action HUD Core when an action is left or right-clicked
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionClick(event, encodedValue) {
            const [actionTypeId, actionId] = encodedValue.split('|')
            console.log("handleActionClick")
            console.log(encodedValue)
            const renderable = ['item']

            if (renderable.includes(actionTypeId) && this.isRenderItem()) {
                return this.doRenderItem(this.actor, actionId)
            }

            const knownCharacters = ['character']

            // If single actor is selected
            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, actionTypeId, actionId)
                return
            }

            const controlledTokens = canvas.tokens.controlled
                .filter((token) => knownCharacters.includes(token.actor?.type))

            // If multiple actors are selected
            for (const token of controlledTokens) {
                const actor = token.actor
                await this.#handleAction(event, actor, token, actionTypeId, actionId)
            }
        }

        /**
         * Handle action hover
         * Called by Token Action HUD Core when an action is hovered on or off
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionHover(event, encodedValue) { }

        /**
         * Handle group click
         * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
         * @override
         * @param {object} event The event
         * @param {object} group The group
         */
        async handleGroupClick(event, group) { }

        /**
         * Handle action
         * @private
         * @param {object} event        The event
         * @param {object} actor        The actor
         * @param {object} token        The token
         * @param {string} actionTypeId The action type id
         * @param {string} actionId     The actionId
         */
        async #handleAction(event, actor, token, actionTypeId, actionId) {
            console.log("handleAction")
            console.log(actionTypeId)
            console.log(actionId)
            console.log(event)
            console.log(this)
            switch (actionTypeId) {
                case 'item':
                    this.#handleItemAction(event, actor, actionId)
                    break
                case 'utility':
                    this.#handleUtilityAction(token, actionId)
                    break
                case 'attribute':
                    console.log("attribute action gioppo")
                    this.#handleAttributesAction(actor, actionId)
                    break
                case 'disciplines':
                    console.log("disciplines action gioppo")
                    this.#handleDisciplinesAction(actor, actionId)
                    break
                case 'skills':
                    console.log("skills action gioppo")
                    this.#handleSkillsAction(actor, actionId)
                    break
                case 'predefined':
                    console.log("predefined action gioppo")
                    this.#handlePredefinedAction(actor, actionId)
                    break
            }
        }

        /**
         * Handle item action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        #handleItemAction(event, actor, actionId) {
            const item = actor.items.get(actionId)
            this.toChat(item)
        }

        /**
         * Handle utility action
         * @private
         * @param {object} token    The token
         * @param {string} actionId The action id
         */
        async #handleUtilityAction(token, actionId) {
            switch (actionId) {
                case 'endTurn':
                    if (game.combat?.current?.tokenId === token.id) {
                        await game.combat?.nextTurn()
                    }
                    break
            }
        }

        async #handleAttributesAction(actor, actionId) {
            // Make sure we're only allowing vampires to roll this, since it includes hunger dice

            // Define any variables we need
            const actorHunger = actor.system.hunger.value
            const actorAttributes = actor.system.attributes
            const actorDisciplines = actor.system.disciplines

            // Get the value of any bonuses
            const attribute = actorAttributes[actionId].value
            //const animalism = actorDisciplines.animalism.value

            // Define hunger dice
            const advancedDice = Math.max(actorHunger, 0)

            // Define vampire dice
            // "Basic Dice" is a calculation of what pool we're rolling, minus any "Advanced Dice"
            const basicDice = Math.max(attribute - advancedDice, 0)

            // Send the roll to the API
            WOD5E.api.Roll({
                title: `${WOD5E.Attributes[actionId].label} Vampire Roll`,
                basicDice,
                advancedDice
            })
        }

        async #handleSkillsAction(actor, actionId) {
            // Make sure we're only allowing vampires to roll this, since it includes hunger dice

            // Define any variables we need
            /*             const actorHunger = actor.system.hunger.value
                        const actorSkills = actor.system.skills
            
                        // Get the value of any bonuses
                        const skill = actorSkills[actionId].value
                        //const animalism = actorDisciplines.animalism.value
            
                        // Define hunger dice
                        let advancedDice = 0
                        let basicDice = 0
                        // since skill can be = 0 we do this operation only if > 0
                        if (skill > 0) {
                            advancedDice = Math.max(actorHunger, 0)
            
                            // Define vampire dice
                            // "Basic Dice" is a calculation of what pool we're rolling, minus any "Advanced Dice"
                            basicDice = Math.max(skill - advancedDice, 0)
                        }
             */            // Send the roll to the API
            WOD5E.api.RollFromDataset({
                dataset: {
                    skill: actionId,
                    selectDialog: true
                },
                actor: actor
            })
        }

        async #handleDisciplinesAction(actor, actionId) {
            console.log(actionId)
            const [discipline, disciplineId] = actionId.split('_')
            console.log(disciplineId)
            console.log(actor.system.disciplines[discipline].powers)
            const power = actor.system.disciplines[discipline].powers.filter(pow => pow._id == disciplineId)
            console.log(power)
            const dicepool = power[0].system.dicepool
            console.log(dicepool)
            const paths = Object.values(dicepool).map((pool) => { return `${pool.path}` })
            console.log(paths)
            let dataset = {
                selectDialog: true,
                attribute: "",
                skill: "",
                discipline: ""
            }
            paths.forEach(element => {
                let [key, value] = element.split('.')
                switch (key) {
                    case "attributes":
                        dataset["attribute"] = value
                        break;
                    case "disciplines":
                        dataset["discipline"] = value
                        break;
                    case "skills":
                        dataset["skill"] = value
                        break;

                    default:
                        break;
                }


            });
            console.log(dataset)
            const diceBasic = await WOD5E.api.getBasicDice({ valuePaths: paths, flatMod: 0, actor: actor })
            console.log(diceBasic)

            const diceAd = await WOD5E.api.getAdvancedDice({ actor: actor })
            const basicDice = Math.max(diceBasic - diceAd, 0)
            //WOD5E.api.Roll({ basicDice: basicDice, advancedDice: diceAd, actor: actor, title: `${power[0].name} Vampire Roll`, })
            WOD5E.api.RollFromDataset({
                dataset: dataset,
                actor: actor
            })
        }

        async #handlePredefinedAction(actor, actionId) {
            console.log(actionId)
            const [label, pathConcat] = actionId.split(';')
            const paths = pathConcat.split('_')
            const fullPaths = paths.map((path) => { return `${path}` })
            const diceBasic = await WOD5E.api.getBasicDice({ valuePaths: fullPaths, flatMod: 0, actor: actor })
            const diceAd = await WOD5E.api.getAdvancedDice({ actor: actor })
            const basicDice = Math.max(diceBasic - diceAd, 0)
            let dataset = {
                selectDialog: true,
                attribute: "",
                skill: "",
                discipline: ""
            }
            fullPaths.forEach(element => {
                let [key, value] = element.split('.')
                switch (key) {
                    case "attributes":
                        dataset["attribute"] = value
                        break;
                    case "disciplines":
                        dataset["discipline"] = value
                        break;
                    case "skills":
                        dataset["skill"] = value
                        break;

                    default:
                        break;
                }
            });
            //            WOD5E.api.Roll({ basicDice: basicDice, advancedDice: diceAd, actor: actor, title: `${label} Roll`, })
            WOD5E.api.RollFromDataset({
                dataset: dataset,
                actor: actor
            })
        }

        async toChat(item) {
            if (!item || !(item instanceof Item)) {
                console.error("Invalid item passed to toChat function.");
                return;
            }

            const itemName = item.name;
            const itemDescription = item.system.description || "No description available.";

            // Construct the chat message
            const chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                content: `
                <div class="item-chat">
                  <h2>${itemName}</h2>
                  <div>${itemDescription}</div>
                </div>
              `,
            };

            // Send the chat message
            ChatMessage.create(chatData);
        }
    }
})
