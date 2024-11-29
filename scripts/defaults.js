import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('Template.Inventory'),
                groups: [
                    { ...groups.weapons, nestId: 'inventory_weapons' },
                    { ...groups.armor, nestId: 'inventory_armor' },
                    { ...groups.equipment, nestId: 'inventory_equipment' },
                    { ...groups.consumables, nestId: 'inventory_consumables' },
                    { ...groups.containers, nestId: 'inventory_containers' },
                    { ...groups.treasure, nestId: 'inventory_treasure' }
                ]
            },
            {
                nestId: 'attribute',
                id: 'attribute',
                name: coreModule.api.Utils.i18n('tokenActionHud.wod.attribute'),
                groups: [
                    { ...groups.attribute, nestId: 'attribute_attribute' }
                ]
            },
            {
                nestId: 'disciplines',
                id: 'disciplines',
                name: coreModule.api.Utils.i18n('tokenActionHud.wod.disciplines'),
                groups: [
                    { ...groups.disciplines, nestId: 'disciplines_disciplines' }
                ]
            },
            {
                nestId: 'skills',
                id: 'skills',
                name: coreModule.api.Utils.i18n('tokenActionHud.wod.skills'),
                groups: [
                    { ...groups.skills, nestId: 'skills_skills' }
                ]
            },
            {
                nestId: 'predefined',
                id: 'predefined',
                name: coreModule.api.Utils.i18n('tokenActionHud.wod.predefined'),
                groups: [
                    { ...groups.predefined, nestId: 'predefined_predefined' }
                ]
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                groups: [
                    { ...groups.combat, nestId: 'utility_combat' },
                    { ...groups.rests, nestId: 'utility_rests' },
                    { ...groups.utility, nestId: 'utility_utility' }
                ]
            }
        ],
        groups: groupsArray
    }
})
