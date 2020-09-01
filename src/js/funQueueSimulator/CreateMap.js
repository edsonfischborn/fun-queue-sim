import BasicElement from '../util/BasicElement';
import mapComponent from './baseComponents/Map';

/**
 * Creates a "game" queue map
 * @author Édson Fischborn
 */
export default class CreateMap extends BasicElement {
  constructor() {
    super({ ...mapComponent });
  }
}
