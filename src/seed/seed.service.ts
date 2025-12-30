import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/pokemon-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async runSeed() {
    await this.pokemonModel.deleteMany({});

    const pokemonsToInsert: { name: string; no: number }[] = [];

    const data  = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonsToInsert.push({ name: name.toLowerCase(), no });
    });
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return 'Seed executed successfully';
  }
}
