'use strict';
const cli = require('../../../lib');
const letsencrypt = require('../letsencrypt');

class SslRenewCommand extends cli.Command {
    run() {
        let instance = this.system.getInstance();
        instance.checkEnvironment();

        if (!instance.cliConfig.has('extension.sslemail')) {
            return Promise.reject(new cli.errors.SystemError('No saved email found, skipping automatic letsencrypt SSL renewal'));
        }

        let email = instance.cliConfig.get('extension.sslemail');
        return this.ui.run(letsencrypt(instance, email, false, true), 'Renewing SSL certificate');
    }
}

SslRenewCommand.description = 'Renew an SSL certificate for a Ghost installation';

module.exports = SslRenewCommand;

