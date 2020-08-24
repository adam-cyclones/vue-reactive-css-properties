import { Callable } from "./callable";
import {StringCastable} from "./types/utils";
import {camelToSnakeCase} from './utils/camelToSnakeCase';

export class CSSProp extends Callable {
  nullValue!: string;
  value!: StringCastable;
  fallbackValue!: StringCastable | undefined;
  key!: string;
  snakeKey!: string;
  factory: any;

  constructor(value: StringCastable, fallbackValue?: StringCastable) {
    super();
    this.nullValue = "unset";
    this.value = value;
    this.fallbackValue = fallbackValue;
  }

  commitKey(key: string) {
    this.key = key;
    this.snakeKey = camelToSnakeCase(this.key);
  }

  commitValue() {
    if (!this.value) {
      this.value = this.factory.getValue();
      this.fallbackValue = this.nullValue;
    }
  }

  commitFactory(factory: any) {
    this.factory = factory;
    // check if we need to lookup value from stylesheet
    // from this tract:
    // this could happen if no value was passed to default prop
    // or no default prop exists
    this.commitValue();
    this.pushProperty();
  }

  pushProperty() {
    this.factory(this.value, this.fallbackValue);
  }

  /**
   * @description Updates an existing Reactive CSS Property
   * @comment value is ensured at this point
   */
  function(value: StringCastable, fallbackValue?: StringCastable) {
    // check if we need to lookup value from stylesheet
    // from this tract:
    // this could happen if no value was passed to update prop
    this.value = value;
    this.fallbackValue = fallbackValue;
    this.commitValue();
    this.pushProperty();
  }

  externalSetValue(value: StringCastable, fallbackValue?: StringCastable) {
    this.value = value;
    this.fallbackValue = fallbackValue || this.fallbackValue;
    this.commitValue();
    this.pushProperty();
  }

  static validator(value: Callable) {
    // is a callable
    return value.name === "bound anonymous";
  }

  valueOf() {
    return `var(--${this.snakeKey})`;
  }
}
