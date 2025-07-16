import { CLIENT_COMPONENT_MAP } from '../components/apps/sfa/enquiry/client.config';
import { AuthUtils } from './auth-org';

export async function getClientComponent(componentType: 'list' | 'add' | 'detail' | 'edit') {
  const org = await AuthUtils.getOrgId();
  const clientName = (org?.org_name || 'default').replace(/\s+/g, '_').toLowerCase();

  const validClients = Object.keys(CLIENT_COMPONENT_MAP);
  const clientKey = validClients.includes(clientName) ? clientName : 'default';

  const componentFn = CLIENT_COMPONENT_MAP[clientKey]?.[componentType];
  if (typeof componentFn === 'function') {
    return componentFn();
  } else {
    throw new Error(`Component not found for type: ${componentType}`);
  }
}
