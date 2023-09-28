import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import { Client } from "./Client"

@Entity()
export class Banker {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    firstName: string

    @Column({
        nullable: true
    })
    lastName: string

    @ManyToMany(
        ()=>Client
    )

    @JoinTable({ name:"banker_client",
    joinColumn:{
        name:"banker",
        referencedColumnName:"id"
    },
    inverseJoinColumn:{
        name:"client",
        referencedColumnName:"id"
    }


}
       

    )
    clients:Client[]
}