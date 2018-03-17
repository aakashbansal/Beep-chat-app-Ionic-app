import { Profile } from "../profile/profile.interface";

export interface Message {

    userFromId: string,
    userFromProfile: {
        firstName: string,
        lastName: string
    },

    userToId: string,
    userToProfile: {
        firstName: string,
        lastName: string
    },
    
    content: string

}