import { MovimentEntity } from "../../../../domain/entities/moviment/Moviment.entity";
import { Description } from "../../../../domain/value-objects/Description.vo";
import { Title } from "../../../../domain/value-objects/Title.vo";
import { MovimentDataRow } from "../moviment-repository.postgres";


export class MovimentMapper {
    public static toDomain(data: MovimentDataRow): MovimentEntity {
        return MovimentEntity.create(
            {
                title: Title.create(data.title),
                short_description: Description.create(data.short_description),
                value: data.value,
                is_fixed: data.is_fixed,
                type: data.type,
                created_at: data.created_at,
                updated_at: data.updated_at,
                user_id: data.user_id,
                category_id: data.category_id
            }
        )
    }
}