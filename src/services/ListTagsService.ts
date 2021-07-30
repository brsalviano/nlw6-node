import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    //Opção sem usar class-transformer
    //let tags = await tagsRepositories.find();
    //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));
    const tags = await tagsRepositories.find();

    //O retorno passa pelo class-transformer
    return classToPlain(tags);
  }
}

export { ListTagsService };
