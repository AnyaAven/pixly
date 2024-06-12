import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm"

//https://typeorm.io/
@Entity()
export class Image extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    height: number

    @Column("int")
    width: number

    @Column("text")
    orientation: string

    @Column("boolean")
    compressed: boolean

    @Column("text")
    comment: string

    // if we wanted to join
    // @OneToOne(() => Photo)
    // @JoinColumn()
    // photo: Photo
}