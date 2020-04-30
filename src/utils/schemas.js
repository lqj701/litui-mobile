import { schema } from 'normalizr';

export const liteappSchema = new schema.Entity('liteapps', {}, {
  idAttribute(value) {
    return value.liteapp ? value.liteapp.id : value.id;
  },
  processStrategy(value) {
    if (value.liteapp) {
      return Object.assign({}, value.liteapp, {
        appStatus: value.appStatus,
        canTrial: value.canTrial,
        neverOpened: value.neverOpened,
      });
    }

    return value;
  },
});
export const liteappListSchema = { liteapps: [liteappSchema] };

export const orderSchema = new schema.Entity('orders');
export const smsPackageSchema = new schema.Entity('smsPackages');
export const smsOrderSchema = new schema.Entity('smsOrders', { order: orderSchema, smsPackage: smsPackageSchema });
export const smsOrdersSchema = { smsOrders: [smsOrderSchema] };

export const scheduleReportSchema = new schema.Entity('scheduleReports');
export const scheduleReportsSchema = { scheduleReports: [scheduleReportSchema] };
