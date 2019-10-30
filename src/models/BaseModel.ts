export abstract class BaseModel {
  public static fill(entity: any, obj: any): {} {
    Object.keys(obj).map((key, index) => {
      entity[key] = obj[key];
    });
    return entity;
  }
}
