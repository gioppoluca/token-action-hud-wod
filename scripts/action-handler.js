// System Module Imports
import { ACTION_TYPE, ITEM_TYPE, PREDEFINED_ACTIONS } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
  /**
   * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
   */
  ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */a
    async buildSystemActions(groupIds) {
      // Set actor and token variables
      this.actors = (!this.actor) ? this._getActors() : [this.actor]
      this.actorType = this.actor?.type

      // Settings
      this.displayUnequipped = Utils.getSetting('displayUnequipped')

      // Set items variable
      if (this.actor) {
        let items = this.actor.items
        items = coreModule.api.Utils.sortItemsByName(items)
        this.items = items
      }

      if (this.actorType === 'vampire') {
        this.#buildCharacterActions()
      } else if (!this.actor) {
        this.#buildMultipleTokenActions()
      }
    }

    /**
     * Build character actions
     * @private
     */
    #buildCharacterActions() {
      this.#buildInventory()
      this.#buildAttributes()
      this.#buildDisciplines()
      this.#buildSkills()
      this.#buildPredefined()
    }

    /**
     * Build multiple token actions
     * @private
     * @returns {object}
     */
    #buildMultipleTokenActions() {
    }

    /**
     * Build inventory
     * @private
     */
    async #buildInventory() {
      if (this.items.size === 0) return

      const actionTypeId = 'item'
      const inventoryMap = new Map()

      for (const [itemId, itemData] of this.items) {
        const type = itemData.type
        const equipped = itemData.equipped

        if (equipped || this.displayUnequipped) {
          const typeMap = inventoryMap.get(type) ?? new Map()
          typeMap.set(itemId, itemData)
          inventoryMap.set(type, typeMap)
        }
      }

      for (const [type, typeMap] of inventoryMap) {
        const groupId = ITEM_TYPE[type]?.groupId

        if (!groupId) continue

        const groupData = { id: groupId, type: 'system' }

        // Get actions
        const actions = [...typeMap].map(([itemId, itemData]) => {
          const id = itemId
          const name = itemData.name
          const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
          const listName = `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`
          const encodedValue = [actionTypeId, id].join(this.delimiter)

          return {
            id,
            name,
            listName,
            encodedValue
          }
        })

        // TAH Core method to add actions to the action list
        this.addActions(actions, groupData)
      }
    }

    async #buildPredefined(){
      const groupData = { id: 'predefined', type: 'system' }
      this.addActions(PREDEFINED_ACTIONS, groupData)
    }

    async #buildAttributes() {
      const abilities = this.actor?.system.attributes;
      if (abilities.length === 0) return;
      const actionTypeId = 'attribute'
      console.log(this)
      const groupData = { id: 'attribute', type: 'system' }
      // Get actions
      const actions = Object.entries(abilities)
        .filter(ability => abilities[ability[0]].value !== 0)
        .map(([abilityId, ability]) => {
          console.log(abilityId)
          console.log(ability)
          const name = WOD5E.Attributes[abilityId].label;
          const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
          return {
            id: `${abilityId}`,
            name: name,
            listName: `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`,
            encodedValue: [actionTypeId, abilityId].join(this.delimiter)
          };

        });
      this.addActions(actions, groupData)
    }

    async #buildSkills() {
      const skills = this.actor?.system.skills;
      if (skills.length === 0) return;
      const actionTypeId = 'skills'
      console.log(this)
      const groupData = { id: 'skills', type: 'system' }
      // Get actions
      const actions = Object.entries(skills)
        .map(([skillId, skill]) => {
          console.log(skillId)
          console.log(skill)
          const name = WOD5E.Skills[skillId].label;
          const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
          return {
            id: `${skillId}`,
            name: name,
            listName: `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`,
            encodedValue: [actionTypeId, skillId].join(this.delimiter)
          };

        });
      this.addActions(actions, groupData)
    }


    async #buildDisciplines() {
      const disciplines = this.actor?.system.disciplines;
      if (disciplines.length === 0) return;
      const groupData = { id: 'disciplines', type: 'system' }

      const actions = Object.entries(disciplines)
        .filter(discipline => disciplines[discipline[0]].value !== 0)
        .map(([disciplineId, discipline]) => {
          console.log(disciplineId)
          console.log(discipline)
          const powers = discipline.powers
          let pools = powers.filter(power => power.system.dicepool?.length !== 0)
            .map((pow) => {
              console.log("pow")
              console.log(pow)
              return {
                //            pool: Object.values(pow.system.dicepool).map((pool) => {return pool.path})
                id: `${disciplineId}.${pow._id}`,
                name: `${discipline.displayName}: ${pow.name}`,
                listName: discipline,
                encodedValue: ['disciplines', `${disciplineId}_${pow._id}`].join(this.delimiter)
              }
            })
          console.log(pools)
          return Object.values(pools)
          return {
            id: disciplineId,
            name: discipline.displayName,
            listName: discipline,
            encodedValue: ['disciplines', disciplineId].join(this.delimiter)
          }
        });
      console.log(actions)
      console.log(actions[0])
      this.addActions(actions[0], groupData)
    }
  }
})
