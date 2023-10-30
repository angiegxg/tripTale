export type Category= "beach" | "Historical Memory"| "museum"


export interface Place{
    id: number
    title: String
    category: Category
    description?: String
    imgUrl?: String
    pageUrl?: String
    latitude: String
    longitude: String
    
}

export interface TripTale {
    id:number
    date: Date
    place:  Place
    placeId: Int 
    content?:   String
    author:    User   
   }

export interface User{
    id:number
    email: String
    name?: String | null
    password: string
    
}

export type NonSensitiveInfoUser= Omit<User, 'password'>

