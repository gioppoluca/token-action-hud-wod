/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-wod'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '1.5'

/**
 * Action types
 */
export const ACTION_TYPE = {
    item: 'tokenActionHud.wod.item',
    utility: 'tokenActionHud.utility'
}

/**
 * Groups
 */
export const GROUP = {
    attribute: { id: 'attribute', name: 'tokenActionHud.wod.attribute', type: 'system' },
    disciplines: { id: 'disciplines', name: 'tokenActionHud.wod.disciplines', type: 'system' },
    skills: { id: 'skills', name: 'tokenActionHud.wod.skills', type: 'system' },
    predefined: { id: 'predefined', name: 'tokenActionHud.wod.predefined', type: 'system' },
    armor: { id: 'armor', name: 'tokenActionHud.wod.armor', type: 'system' },
    equipment: { id: 'equipment', name: 'tokenActionHud.wod.equipment', type: 'system' },
    consumables: { id: 'consumables', name: 'tokenActionHud.wod.consumables', type: 'system' },
    containers: { id: 'containers', name: 'tokenActionHud.wod.containers', type: 'system' },
    treasure: { id: 'treasure', name: 'tokenActionHud.wod.treasure', type: 'system' },
    weapons: { id: 'weapons', name: 'tokenActionHud.wod.weapons', type: 'system' },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' }
}

/**
 * Item types
 */
export const ITEM_TYPE = {
    armor: { groupId: 'armor' },
    backpack: { groupId: 'containers' },
    consumable: { groupId: 'consumables' },
    equipment: { groupId: 'equipment' },
    treasure: { groupId: 'treasure' },
    weapon: { groupId: 'weapons' }
}

export const PREDEFINED_ACTIONS = [
    {
        listName: "Unarmed Melee Attack",
        id: "Unarmed;attributes.strength_skills.brawl",
        name: "Melee Attack",
        encodedValue: "predefined|Melee;attributes.dexterity_skills.melee"
    },
    {
        listName: "Grappling",
        id: "Grappling;attributes.strength_skills.brawl",
        name: "Grappling",
        encodedValue: "predefined|Grappling;attributes.strength_skills.brawl",
    },
    {
        listName: "One-handed Melee Attack",
        id: "Melee;attributes.dexterity_skills.melee",
        name: "One-handed Melee Attack",
        encodedValue: "predefined|Melee;attributes.dexterity_skills.melee"
    },
    {
        listName: "Two-handed Melee Attack",
        id: "Melee;attributes.strength_skills.melee",
        name: "Two-handed Melee Attack",
        encodedValue: "predefined|Melee;attributes.strength_skills.melee",
    },
    {
        listName: "Ranged Attack",
        id: "Ranged;attributes.composure_skills.firearms",
        name: "Ranged Attack",
        encodedValue: "predefined|Ranged;attributes.composure_skills.firearms",
    },
    {
        listName: "Sniper Attack",
        id: "Sniper;attributes.resolve_skills.firearms",
        name: "Sniper Attack",
        encodedValue: "predefined|Sniper;attributes.resolve_skills.firearms",
    },
    {
        listName: "Throwing",
        id: "Throwing;attributes.dexterity_skills.athletics",
        name: "Throwing",
        encodedValue: "predefined|Throwing;attributes.dexterity_skills.athletics",
    },
    {
        listName: "Dodging",
        id: "Dodging;attributes.dexterity_skills.athletics",
        name: "Dodging",
        encodedValue: "predefined|Dodging;attributes.dexterity_skills.athletics",
    },
    {
        listName: "Climbing",
        id: "Climbing;attributes.dexterity_skills.athletics",
        name: "Climbing",
        encodedValue: "predefined|Climbing;attributes.dexterity_skills.athletics",
    },
    {
        listName: "SneakUp",
        id: "SneakUp;attributes.dexterity_skills.stealth",
        name: "Sneak Up",
        encodedValue: "predefined|SneakUp;attributes.dexterity_skills.stealth",
    },
    {
        listName: "Observing",
        id: "Observing;attributes.wits_skills.awareness",
        name: "Observing",
        encodedValue: "predefined|Observing;attributes.wits_skills.awareness",
    },
    {
        listName: "PeacefulInterrogation",
        id: "PeacefulInterrogation;attributes.manipulation_skills.insight",
        name: "Peaceful Interrogation",
        encodedValue: "predefined|PeacefulInterrogation;attributes.manipulation_skills.insight",
    },
    {
        listName: "ViolentInterrogation",
        id: "ViolentInterrogation;attributes.manipulation_skills.intimidation",
        name: "Violent Interrogation",
        encodedValue: "predefined|ViolentInterrogation;attributes.manipulation_skills.intimidation",
    },
    {
        listName: "CheckCrimeScene",
        id: "CheckCrimeScene;attributes.intelligence_skills.investigation",
        name: "Check Crime Scene",
        encodedValue: "predefined|CheckCrimeScene;attributes.intelligence_skills.investigation",
    },
    {
        listName: "FollowTracks",
        id: "FollowTracks;attributes.intelligence_skills.survival",
        name: "Follow Tracks",
        encodedValue: "predefined|FollowTracks;attributes.intelligence_skills.survival",
    },
    {
        listName: "SolveAlarm",
        id: "SolveAlarm;attributes.intelligence_skills.larceny",
        name: "Solve Alarm",
        encodedValue: "predefined|SolveAlarm;attributes.intelligence_skills.larceny",
    },
    {
        listName: "Convincing",
        id: "Convincing;attributes.manipulation_skills.persuasion",
        name: "Convincing",
        encodedValue: "predefined|Convincing;attributes.manipulation_skills.persuasion",
    },
    {
        listName: "Hiding",
        id: "Hiding;attributes.dexterity_skills.stealth",
        name: "Hiding",
        encodedValue: "predefined|Hiding;attributes.dexterity_skills.stealth",
    }
]



