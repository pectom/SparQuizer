import {Code} from "../state/AppModel";

export const BaseHumanProps = [
    "P18", //"img",
    "P27", //"country",
    "P569",  //"dateOfBirth",
    "P19", // placeOfBirth
    "P106",  //"occupation",
]

export const HumansProfessions: Code[] = [
    "Q33999", //  actor
    "Q36180", //  writer
    "Q177220", //  singer
    "Q901", //  scientist
    "Q937857", //  football player
    "Q3665646", //  basketball plater
]

export const ExtendedHumanProps = [
    // all
    "P742", //"pseudonym",
    "P1399",  //"convicted",
    "P166", //"awards",
    "P509", // cause of death
    "P69",// educated at
    "P119", // place of burial

    // singer
    "P136", // music genre
    "P1303", // instrument
    "P412", // voice type

    //scientist
    "P1344", // participant in
    "P1441", // present in work
    "P1343", // described at
    "P1066", // student of
    "P184", // doctoral advisor
    "P101", // field of work
    "P463", // member of

    // athlete
    "P54", //club
    "P118" //league
]

export const FilteredProps: Code[] = [
    "P213", //  ISNI
]
