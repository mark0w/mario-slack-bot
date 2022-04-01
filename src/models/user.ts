import {Schema, Document, Model, model} from 'mongoose';

export enum PodiumScores {
    First = 15,
    Second = 12,
    Third = 10,
    Fourth = 9,
    Fifth = 8,
    Sixth = 7,
    Seventh = 6,
    Eighth = 5,
    Ninth = 4,
    Tenth = 3,
    Eleventh = 2,
    Twelfth = 1
}

interface PodiumStats extends Document {
    firstPlace: number;
    secondPlace: number;
    thirdPlace: number;
}

interface IUser extends Document {
    fullName: string;
    matchesPlayed: number;
    podiumStats: PodiumStats;
}

const UserSchema: Schema = new Schema({
    fullName: {type: String, required: true, unique: true},
    matchesPlayed: {type: Number, required: true},
    podiumStats: {
        firstPlace: {type: Number},
        secondPlace: {type: Number},
        thirdPlace: {type: Number}
    }
});

const User: Model<IUser> = model('User', UserSchema);
