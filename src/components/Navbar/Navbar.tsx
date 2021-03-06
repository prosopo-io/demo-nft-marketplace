import { Logo } from 'assets';
import { ExtensionAccountSelect, ProsopoConsumer } from 'components/Prosopo';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

const Navbar: FC<unknown> = () => {
  const router = useRouter();
  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <nav className="sticky top-0 z-20 bg-secondary">
      <div className="flex px-2 py-3.5 mx-auto md:py-0 md:h-24 max-w-screen-2xl sm:px-4 lg:px-8">
        <div className="flex items-center justify-between w-full px-2 lg:px-0 ">
          <div className="flex-1">
            <div className="flex items-center">
              <div onClick={goToHome} className="block -mt-1 text-2xl cursor-pointer w-7">
                <img className="w-7" src={Logo} />
              </div>
              <span
                onClick={goToHome}
                className="hidden h-auto pl-3 text-xl font-bold text-white cursor-pointer lg:block align-cente"
              >
                ProsopoStore
              </span>
            </div>
          </div>
          <div className="flex lg:ml-6">
            <ProsopoConsumer>
              {({ clientInterface }) => (
                <>
                  {clientInterface.getExtension() &&
                    (!clientInterface.manager.state.account ? (
                      <div className="prosopo-extension">
                        <ExtensionAccountSelect
                          value={clientInterface.manager.state.account}
                          options={clientInterface.getExtension().getAccounts()}
                          onChange={clientInterface.onAccountChange.bind(clientInterface)}
                        />
                      </div>
                    ) : (
                      <ProfileDropdown
                        address={clientInterface.manager.state.account.address}
                        disconnect={() => clientInterface.onAccountUnset()}
                      />
                    ))}
                </>
              )}
            </ProsopoConsumer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
